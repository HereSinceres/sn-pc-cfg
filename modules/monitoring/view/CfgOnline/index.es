var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var store = require('modules/monitoring/dataService/store.es');
var api = require('modules/monitoring/dataService/api.es');
var $container = function() {
    return $('.J-wrapper');
};
module.exports = {
    components: {},
    data: function() {
        return {};
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function() {
        var self = this;
        // 初始化项目
        self.setHtml();
        self.bindEvent();
        $(window).resize(function() {
            console.log("不建议调整窗口大小!");
            var width = $container().width();
            var wwidth = $(window).width();
            if (wwidth < width) {
                var captchaScale = wwidth / width;
                $container().css({
                    'transform': 'scale(' + captchaScale + ')',
                    'transform-origin': 'left top',
                    '-webkit-transform-origin': 'left top'
                });
            }
        });
    },
    methods: {
        setHtml: function() {
            var self = this;
            if (store.currentCfg.html) {
                var html = decodeURI(store.currentCfg.html);
                $container().replaceWith(html);
            }
            $container().addClass('online');
        },

        bindEvent: function() {
            var self = this;
            $(document).find('[data-cfg-uuid]').each(function() {
                var eleDom = this;
                var data = $(eleDom).data();
                comlib.forEach(function(element) {
                    if (data.cfg_type === element.type) {
                        element.monitorCallBack(eleDom);
                    }
                }, this);
            });
            Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.TRIGGER_REFRESH_MONITOR);
            this.startRequest();
        },
        startRequest: function() {
            var self = this;
            api.getVarValueByProId(
                store.currentCfg.proId
            ).then(function(res) {
                store.variable = res.Data;
                Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.TRIGGER_REFRESH_MONITOR);
                setTimeout(function() {
                    self.startRequest();
                }, 10000);
            })
        }
    }
};