 
var ConfigPage = require('./view/ConfigPage/index.es'); 
var Preview = require('./view/Preview/index.es'); 
var Mock = require('./view/Mock/index.es');  

var routes = [{
    path: '/',
    component: ConfigPage
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
