var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var store = require('modules/monitoring/dataService/store.es');
var api = require('modules/monitoring/dataService/api.es');
var variable = require('modules/monitoring/dataService/variable.es');

module.exports = {
    components: {},
    data: function () {
        return {};
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        var self = this; 
        var proId = this.getCurrentCfg('proId'); 
        // 初始化项目
        api.getVarValueByProId(
            proId
        ).then(function (res) {
            variable.setItem(JSON.parse(res.Data));
            self.init();
            Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.TRIGGER_REFRESH_MONITOR);
        })
    },
    methods: {
        getCurrentCfg: function (type) {
            var data;
            var self = this;
            store.cfgList.forEach(function (element) {
                if (element.id == self.$route.params.cfgId) {
                    data = element;
                    console.log(data);
                }
            }, this);
            if (type == 'html') {
                try {
                    return decodeURI(data.html?data.html:'');
                } catch (error) {
                    return null;
                }
            }
            if (type == 'proId') {
                return data.proId;
            }
        },
        init: function () {
            var self = this;
            $(self.$el).replaceWith(this.getCurrentCfg('html'));
            $(self.$el).find('[data-cfg-uuid]').each(function () {
                var eleDom = this;
                var data = $(eleDom).data();
                comlib.forEach(function (element) {
                    if (data.cfg_type === element.type) {
                        element.monitorCallBack(eleDom);
                    }
                }, this);
            }); 
        }
    }
};