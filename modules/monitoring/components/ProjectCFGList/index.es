var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var variable = require('modules/monitoring/dataService/variable.es');

var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');
var api = require('modules/monitoring/dataService/api.es');
module.exports = {
    props: [],
    components: {

    },
    data: function () {
        return {

        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        console.log(this.$route.params.proId, this.$route.params.cfgId);
    },
    methods: {

    }
};