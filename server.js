var express = require('express');
var path = require('path');
var url = require('url');
var fs = require('fs');
var bodyParser = require('body-parser')
var proxy = require('http-proxy-middleware');

var args = process
  .argv
  .join('|');

var program = require('commander');
var port = /\-\-port\|(\d+)(?:\||$)/.test(args)
  ? ~~ RegExp.$1
  : 8080;

var https = /\-\-https\|(true)(?:\||$)/.test(args)
  ? !!RegExp.$1
  : false;

var DOCUMENT_ROOT = path.resolve(/\-\-root\|(.*?)(?:\||$)/.test(args)
  ? RegExp.$1
  : process.cwd());

var app = express();

// logger
app.use(require('morgan')('short'));
// add proxy support
var apiAddress = 'https://i.cloudhvacr.com';
app.use('/UserAdmin', proxy({
  target: apiAddress,
  changeOrigin: true,
  pathRewrite: {
    '^/UserAdmin': '/UserAdmin'
  },
}));
app.use('/api', proxy({
  target: apiAddress,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api'
  },
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// 静态文件输出
app.use(express.static(DOCUMENT_ROOT, {
  index: [
    'index.html', 'index.htm', 'default.html', 'default.htm'
  ],
  extensions: ['html', 'htm']
}));

// 静态文件列表。
app.use((function() {
  return function(req, res, next) {
    var pathname = url
      .parse(req.url)
      .pathname;
    var fullpath = path.join(DOCUMENT_ROOT, pathname);

    if (/\/$/.test(pathname) && fs.existsSync(fullpath)) {
      var stat = fs.statSync(fullpath);

      if (stat.isDirectory()) {
        var html = '';

        var files = fs.readdirSync(fullpath);

        html = '<!doctype html>';
        html += '<html>';
        html += '<head>';
        html += '<title>' + pathname + '</title>';
        html += '</head>';
        html += '<body>';
        html += '<h1> - ' + pathname + '</h1>';
        html += '<div id="file-list">';
        html += '<ul>';

        if (pathname != '/') {
          html += '<li><a href="' + pathname + '..">..</a></li>';
        }

        files
          .forEach(function(item) {
            var s_url = path.join(pathname, item);
            html += '<li><a href="' + s_url + '">' + item + '</a></li>';
          });

        html += '</ul>';
        html += '</div>';
        html += '</body>';
        html += '</html>';

        res.send(html);
        return;
      }
    }

    next();
  };
})());

// utf8 support
app.use(function(req, res, next) {

  // attach utf-8 encoding header to text files.
  if (/\.(?:js|json|text|css)$/i.test(req.path)) {
    res.charset = 'utf-8';
  }

  next();
});

// 错误捕获。
app.use(function(err, req, res, next) {
  console.log(err);
});

// Bind to a port
var server;

if (https) {
  server = require('https').createServer({
    key: fs.readFileSync(path.join(__dirname, 'key.pem'), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'), 'utf8')
  }, app);
} else {
  server = require('http').createServer(app);
}

server
  .listen(port, '0.0.0.0', function() {
    console.log(' Listening on ' + (https
      ? 'https'
      : 'http') + '://127.0.0.1:%d', port);
  });

// 在接收到关闭信号的时候，关闭所有的 socket 连接。
(function() {
  var sockets = [];

  server.on('connection', function(socket) {
    sockets.push(socket);

    socket.on('close', function() {
      var idx = sockets.indexOf(socket);
      ~idx && sockets.splice(idx, 1);
    });
  });

  var finalize = function() {
    // Disconnect from cluster master
    process.disconnect && process.disconnect();
    process.exit(0);
  }

  // 关掉服务。
  process.on('SIGTERM', function() {
    console.log(' Recive quit signal in worker %s.', process.pid);
    sockets.length
      ? sockets.forEach(function(socket) {
        socket.destroy();
        finalize();
      })
      : server.close(finalize);
  });
})(server);