var Base = require('modules/monitoring/Base.es');
module.exports = {
    components: {
        ProjectCFGList: require('modules/monitoring/components/ProjectCFGList/index.es'),
        ControlSidebar: require('modules/monitoring/components/ControlSidebar/index.es'),
        ContentWrapper: require('modules/monitoring/components/ContentWrapper/index.es'),
        Setting: require('modules/monitoring/components/Setting/index.es')
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
    },
    methods: {

    }
};