 var ConfigPage = require('./view/ConfigPage/index.es');
 var Preview = require('./view/Preview/index.es');
 var Mock = require('./view/Mock/index.es');
 var api = require('modules/monitoring/dataService/api.es');


 var routes = [{
     path: '/',
     beforeEnter: (to, from, next) => {
       next('/cfg/1/1');
     }
   },
   {
     path: '/cfg/:proId/:cfgId',
     component: ConfigPage,
     beforeEnter: (to, from, next) => {
       api.getProList(function () {
         next();
       });
     }
   },
   {
     path: '/Preview',
     component: Preview
   },
   {
     path: '/Mock',
     component: Mock
   }
 ];

 module.exports = routes;