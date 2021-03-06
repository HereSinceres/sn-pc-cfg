var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var store = require('modules/monitoring/dataService/store.es');
var api = require('modules/monitoring/dataService/api.es');
var domUtil = require('modules/util/dom/domUtil.es');
var $container = function () {
    return $('.J-wrapper');
};
 
module.exports = {
    components: {},
    data: function () {
        return {};
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'init'
    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        var self = this;
        this.init();
        $(window).resize(function () {
            // console.log("不建议调整窗口大小!");
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
        init: function () {
            var self = this; 
            api.getCfgManagementById(this.$route.params.cfgId).then(function (res) {
                store.currentCfg = res.Data;
                self.setHtml();
                self.bindEvent();
            });
        },
        setHtml: function () {
            var self = this;
            if (store.currentCfg.html) {
                var html = decodeURI(store.currentCfg.html);
                $container().replaceWith(html);
            }
            $container().addClass('online');
            // 删除无用样式
            $container().find('.point-handle').remove();
        },
        bindEvent: function () {
            var self = this;
            $(document).find('[data-cfg-uuid]').each(function () {
                var dom = this;
                var attrs = domUtil.getAttributes($(dom));
                var uuid = attrs['data-cfg-uuid'];
                comlib.forEach(function (element) {
                    if (attrs['data-cfg_type'] === element.type) {
                        if (element.monitorCallBack) {
                            element.monitorCallBack(uuid);
                        }
                        if (element.bindOutputVar) {
                            element.bindOutputVar(uuid);
                        }
                    }
                }, this);
            });
            Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.TRIGGER_REFRESH_MONITOR);
            this.startRequest();
        },
        startRequest: function () {
            var canvasDom = $('.J-wrapper')[0];
            var attrs = domUtil.getAttributes($(canvasDom));
            var self = this;
            api.getVarValueByProId(
                store.currentCfg.proId
            ).then(function (res) {
                res.Data = res.Data.map(function (x) {
                    x.IsAcVar = x.IsAcquisitionVariable;
                    x.vName = x.VName;
                    x.vValue = x.OriginalValue;
                    x.vid = x.EVaribaleId;
                    return x;
                });
                store.variable = res.Data;
                Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.TRIGGER_REFRESH_MONITOR);
                setTimeout(function () {
                    self.startRequest();
                }, (attrs['data-cfg_refresh_timer'] || 10) * 1000);
            })
        }
    }
};