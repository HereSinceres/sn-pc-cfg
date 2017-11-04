var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var api = require('modules/monitoring/dataService/api.es');
var store = require('modules/monitoring/dataService/store.es');
var domUtil = require('modules/util/dom/domUtil.es');
module.exports = {
    components: {},
    data: function () {
        return {
            isShowCanvasSetDialog: false,
            isShowVariableSetDialog: false,
            canvas: {
                w: null,
                h: null,
                bg: null
            },
            cfg: {
                refreshTimer: null
            },
            variable: store.variable,
            isDebuggerFireToOnline: 0
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {

        this.isDebuggerFireToOnline = 1;
        window.__isDebuggerFireToOnline__ = this.isDebuggerFireToOnline;
    },
    methods: {
        getHtml: function () {
            return $('.J-wrapper')[0].outerHTML;
        },
        toggleCanvasSet: function (isShow) {
            var canvasDom = $('.J-wrapper')[0];
            this.canvas.w = (canvasDom.style.width || canvasDom.clientWidth || 0);
            this.canvas.h = (canvasDom.style.height || canvasDom.clientHeight || 0);
            this.canvas.bg = canvasDom.style.backgroundColor;
            var attrs = domUtil.getAttributes($(canvasDom));
            this.cfg.refreshTimer = attrs['data-cfg_refresh_timer'] || 10;


            this.isShowCanvasSetDialog = isShow;
        },
        savePaintSet: function () {
            this.isShowCanvasSetDialog = 0;
            var canvasDom = $('.J-wrapper')[0];
            if (canvasDom) {
                canvasDom.style.width = this.canvas.w;
                canvasDom.style.height = this.canvas.h;
                canvasDom.style.backgroundColor = this.canvas.bg;
            }
            $(canvasDom).attr('data-cfg_refresh_timer', this.cfg.refreshTimer);
        },
        saveMockVariable: function () {
            store.variable = this.variable;
            this.toggleVariableSet(0);
            $.notify({
                message: '修改模拟数据成功'
            });
        },
        save: function () {
            var self = this;
            var data;
            data = store.currentCfg;
            data.html = encodeURI(this.getHtml());
            api.UpdateCfgManagement(data).then(function () {
                $.notify({
                    message: '提交成功'
                });
            })
        },
        toggleVariableSet: function (isShow) {
            this.isShowVariableSetDialog = isShow;
        },
        run: function () {
            Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.TRIGGER_REFRESH_MONITOR);
        },
        toggleControlInEffect: function () {
            this.isDebuggerFireToOnline = !this.isDebuggerFireToOnline;
            window.__isDebuggerFireToOnline__ = this.isDebuggerFireToOnline;
        }
    }
};