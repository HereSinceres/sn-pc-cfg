var ConfigPage = require('./view/ConfigPage/index.es');
var Preview = require('./view/Preview/index.es');
var Mock = require('./view/Mock/index.es');
var Cfg = require('./view/Cfg/index.es');
var api = require('modules/monitoring/dataService/api.es');
var store = require('modules/monitoring/dataService/store.es');
var variable = require('modules/monitoring/dataService/variable.es');

function getCFGListByProId(proId, callback) {
  api.getCFGListByProId(proId).then(function (res) {
    store.cfgList = res.Data;
    if (store.cfgList.length > 0) {
      callback();
    } else {
      var data = {
        id: '',
        proId: proId,
        cfgName: '默认配置',
        html: '',
        tag: 0
      };
      // 创建一个默认组态界面
      api.AddCfgManagement(data).then(function () {
        getCFGListByProId(proId);
      })
    }
  }, function (error) {});
}
var routes = [{
    path: '/',
    beforeEnter: (to, from, next) => {
      api.getProList().then(function (res) {
        store.proList = res.rows;
        var proId = res.rows[4].ProjectId;
        getCFGListByProId(proId, function () {
          next('/cfg/' + proId + '/' + store.cfgList[0].id);
        });
      });
    }
  },
  {
    path: '/cfg/:proId/:cfgId',
    component: ConfigPage,
    beforeEnter: (to, from, next) => {
      api.getProList().then(function (res) {
        store.proList = res.rows;
        getCFGListByProId(to.params.proId, function () {
          next();
        });
      }); 
    }
  },
  {
    path: '/Preview',
    component: Preview
  },
  {
    path: '/cfgOnline/:cfgId',
    component: Cfg
  },
  {
    path: '/Mock',
    component: Mock
  }
];

module.exports = routes;