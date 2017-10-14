var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var proStorage = require('modules/monitoring/dataService/proset.es');

module.exports = {
    components: {},
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
        // 初始化项目
        self.init();
    },
    methods: {
        init: function () {
            var self = this;
            $(self.$el).find('.J-wrapper').append(proStorage.getItem());
            $(self.$el).find('[data-cfg-uuid]').each(function () {
                var eleDom = this;
                var data = $(eleDom).data();
                comlib.forEach(function (element) {
                    if (data.cfg_type === element.type) {
                        element.monitorCallBack(eleDom);
                    }
                }, this);
            });
            setTimeout(function() {
                Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.TRIGGER_REFRESH_MONITOR);
                
            }, 1000);
        }
    }
};