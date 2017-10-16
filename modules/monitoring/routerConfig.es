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
           debugger
           next('/cfg/' + proId + '/');
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
         api.getCFGListByProId().then(function (res) {
           store.cfgList = res.rows;
           api.getVarValueByProId(to.params.proId).then(function (res) {
             if (res.success) {
               //  variable.setItem([{
               //    id: 1,
               //    cfgId: 1,
               //    name: '变量1',
               //    vName: 'var1',
               //    value: 0
               //  }, {
               //    id: 1,
               //    cfgId: 1,
               //    name: '变量2',
               //    vName: 'var2',
               //    value: 1
               //  }]);
               variable.setItem(res.Data);
               next();
             }

           });
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