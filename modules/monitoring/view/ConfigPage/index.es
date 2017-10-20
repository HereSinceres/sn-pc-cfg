var Base = require('modules/monitoring/Base.es');
module.exports = {
    components: {
        NavBar:require('modules/monitoring/components/NavBar/index.es'),
        ToolBar:require('modules/monitoring/components/ToolBar/index.es'),
        AllComponents: require('modules/monitoring/components/AllComponents/index.es'),
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