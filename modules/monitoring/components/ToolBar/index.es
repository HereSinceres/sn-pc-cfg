var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var api = require('modules/monitoring/dataService/api.es');
var store = require('modules/monitoring/dataService/store.es');
var domUtil = require('modules/util/dom/domUtil.es');
function setScale(currentScale) {
    $('.J-wrapper').css({
        'transform': 'scale(' + currentScale + ')',
        'transform-origin': 'left top',
        '-webkit-transform-origin': 'left top'
    });
}
module.exports = {
    components: {},
    data: function () {
        return {
            isMulSelection: false,
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
            isDebuggerFireToOnline: 0,
            isMulSelection: 0,
            currentScale: 1
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

        compress: function () {
            this.currentScale = this.currentScale - 0.02;
            setScale(this.currentScale);
        },
        reset: function () {
            this.currentScale = 1;
            setScale(this.currentScale);
        },
        expand: function () {
            this.currentScale = this.currentScale + 0.02;
            if (this.currentScale > 1) {
                this.currentScale = 1;
            }
            setScale(this.currentScale);
        },
        getHtml: function () {
            return $('.J-wrapper')[0].outerHTML;
        },
        toggleCanvasSet: function (isShow) {
            var canvasDom = $('.J-wrapper')[0];
            this.canvas.w = $(canvasDom).attr('width') || 0;
            this.canvas.h = $(canvasDom).attr('height') || 0;
            this.canvas.bg = canvasDom.style.backgroundColor;
            var attrs = domUtil.getAttributes($(canvasDom));
            this.cfg.refreshTimer = attrs['data-cfg_refresh_timer'] || 10;

            this.isShowCanvasSetDialog = isShow;
        },
        savePaintSet: function () {
            this.isShowCanvasSetDialog = 0;
            var canvasDom = $('.J-wrapper')[0];
            if (canvasDom) {
                $(canvasDom).attr('width', this.canvas.w);
                $(canvasDom).attr('height', this.canvas.h);
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
            this.reset();
            var self = this;
            var data;
            data = store.currentCfg;
            data.html = encodeURI(this.getHtml());
            api.UpdateCfgManagement(data).then(function () {
                $.notify({
                    message: '提交成功'
                });
            });
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
        },
        toggleMulSelection: function () {
            this.isMulSelection = !this.isMulSelection;
            window.__isMulSelection__ = this.isMulSelection;
        },
        alginClick: function (alginType) {
            var selectItms = window.__select_ele__.slice();
            if (alginType === 'left') {
                if (selectItms.length) {
                    var x = selectItms[0].getAttribute('data-x');
                    for (var index = 0; index < selectItms.length; index++) {
                        var target = selectItms[index];
                        x = (x < parseFloat(target.getAttribute('data-x')) ? x : parseFloat(target.getAttribute('data-x')));
                    };
                    for (var index = 0; index < selectItms.length; index++) {
                        var target = selectItms[index];
                        target.setAttribute('data-x', x);
                        var y = (parseFloat(target.getAttribute('data-y')) || 0);
                        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                    };
                }
            }
            if (alginType === 'right') {
                var maxXAddW = 0;
                for (var index = 0; index < selectItms.length; index++) {
                    var target = selectItms[index];
                    var width = $(target).width();
                    var trueX = parseInt(target.getAttribute('data-x'));
                    maxXAddW = (maxXAddW < (width + trueX) ? (width + trueX) : maxXAddW);
                };
                for (var index = 0; index < selectItms.length; index++) {
                    var target = selectItms[index];
                    var width = $(target).width();
                    x = maxXAddW - width;
                    target.setAttribute('data-x', x);
                    var y = (parseFloat(target.getAttribute('data-y')) || 0);
                    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                };

            }
        }
    }
};
