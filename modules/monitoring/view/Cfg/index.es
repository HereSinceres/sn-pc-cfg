var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var cfgSet = require('modules/monitoring/dataService/cfgSet.es');
module.exports = {
    components: {
        Preview: require('modules/monitoring/view/Preview/index.es'),
    },
    data: function () {
        return {
            // list: serviceStore.notify.notifyList,
            // isHasList: false,
            // isChoosen: false
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        var self = this;
        setInterval(function () {
            console.log(self.$route.params.cfgId);
            Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.TRIGGER_REFRESH_MONITOR);
        }, 1000);
    },
    methods: {}
};