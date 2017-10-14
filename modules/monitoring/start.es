
var Vue = require('modules/lib/vue/vue.js');
var VueRouter = require('modules/lib/vue/vue-router.js');
Vue.use(VueRouter);
var routerConfig = require('./routerConfig.es');
var api = require('modules/monitoring/dataService/api.es'); 

const router = new VueRouter({
    routes: routerConfig
});
router.afterEach(function (router) {
    setTimeout(function () {
        // admin alt 框架制约 resize 重新计算高度
        $(window).resize();
    }, 0);
});
function run() {
    new Vue({
        router: router,
        data: function () {
            return {

            };
        },
        watch: {

        },
        methods: {

        },
        mounted: function () {},
        destroyed: function () {}
    }).$mount('#app');
} 
api.getProList(function () { 
    run();
});
