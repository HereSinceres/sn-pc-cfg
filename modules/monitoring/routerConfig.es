var ConfigPage = require('./view/ConfigPage/index.es');
var ProjectCFGList = require('./view/ProjectCFGList/index.es');
var Mock = require('./view/Mock/index.es');
var CfgOnline = require('./view/CfgOnline/index.es');
var api = require('modules/monitoring/dataService/api.es');
var store = require('modules/monitoring/dataService/store.es');

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
        getCFGListByProId(proId, callback);
      })
    }
  }, function (error) { });
}
var routes = [{
  path: '/',
  beforeEnter: (to, from, next) => {
    next('/ProjectCFGList');
  }
},
{
  path: '/ProjectCFGList',
  component: ProjectCFGList,
  beforeEnter: (to, from, next) => {
    api.getProList().then(function (res) {
      store.proList = res.rows;
      next();
    });
  }
},
{
  name: 'cfg',
  path: '/cfg/:cfgId',
  component: ConfigPage,
  beforeEnter: (to, from, next) => {
    api.getCfgManagementById(to.params.cfgId).then(function (res) {
      store.currentCfg = res.Data;
      api.getVarValueByProId(
        store.currentCfg.proId
      ).then(function (res) {
        store.variable = res.Data;
        next();
      })
    })
  }
},
{
  name: 'CfgOnline',
  path: '/cfgOnline/:cfgId',
  component: CfgOnline,
  beforeEnter: (to, from, next) => {
    api.getCfgManagementById(to.params.cfgId).then(function (res) {
      store.currentCfg = res.Data;
      api.getVarValueByProId(
        store.currentCfg.proId
      ).then(function (res) {
        store.variable = res.Data;
        next();
      })
    })
  }
},
{
  path: '/Mock',
  component: Mock
}
];

module.exports = routes;