
var Base = require('modules/monitoring/Base.es');
var store = require('modules/monitoring/dataService/store.es');
module.exports = {
    components: {},
    data: function () {
        return {
            currentCfg: store.currentCfg
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
    },
    methods: {
        jumpCFGList: function () {
            this.$router.push({ path: '/ProjectCFGList', query: { proId: store.currentCfg.proId } });
        }
    }
};