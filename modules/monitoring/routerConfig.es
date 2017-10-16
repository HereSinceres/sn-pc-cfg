var ConfigPage = require('./view/ConfigPage/index.es');
var Preview = require('./view/Preview/index.es');
var Mock = require('./view/Mock/index.es');
var Cfg = require('./view/Cfg/index.es');
var api = require('modules/monitoring/dataService/api.es');
var store = require('modules/monitoring/dataService/store.es');
var variable = require('modules/monitoring/dataService/variable.es');

var routes = [{
    path: '/',
    beforeEnter: (to, from, next) => {
      api.getProList().then(function (res) {
        store.proList = res.rows;
        console.log(store.proList);
        var proId = res.rows[4].ProjectId;
        api.getCFGListByProId(proId).then(function (res) {
          store.cfgList = res.rows;
          next('/cfg/' + proId + '/');
        }, function (error) {
          console.log(error);
          // TODO 删除
          next('/cfg/' + proId + '/1');
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

        api.getVarValueByProId(to.params.proId).then(function (res) {
          if (res.success) {
            variable.setItem(res.Data);
            api.getCFGListByProId().then(function (res) {
              store.cfgList = res.rows;
              next();
            }, function (error) {
              console.log(error);
              // TODO 删除
              next();
            });
          } 
        }, function (error) {
          console.log(error); 
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