var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var api = require('modules/monitoring/dataService/api.es');
var store = require('modules/monitoring/dataService/store.es');
module.exports = {
    components: {},
    data: function() {
        return {
            isShowCanvasSetDialog: false,
            isShowVariableSetDialog: false,
            canvas: {
                w: null,
                h: null,
                bg: null
            },
            variable: store.variable

        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function() {
        var canvasDom = $('.J-wrapper')[0];
        this.canvas.w = (parseFloat(canvasDom.style.width) || canvasDom.clientWidth || 0);
        this.canvas.h = (parseFloat(canvasDom.style.height) || canvasDom.clientHeight || 0);
        this.canvas.bg = canvasDom.style.backgroundColor;
    },
    methods: {
        getHtml: function() {
            return $('.J-wrapper')[0].outerHTML;
        },
        toggleCanvasSet: function(isShow) {
            this.isShowCanvasSetDialog = isShow;
        },
        savePaintSet: function() {
            this.isShowCanvasSetDialog = 0;
            var canvasDom = $('.J-wrapper')[0];
            if (canvasDom) {
                canvasDom.style.width = this.canvas.w + 'px';
                canvasDom.style.height = this.canvas.h + 'px';
                canvasDom.style.backgroundColor = this.canvas.bg;
            }
        },
        save: function() {
            var self = this;
            var data;
            data = store.currentCfg;
            data.html = encodeURI(this.getHtml());
            api.UpdateCfgManagement(data).then(function() {
                $.notify({
                    message: '保存成功'
                });
            })
        },
        toggleVariableSet: function(isShow) {
            this.isShowVariableSetDialog = isShow;
        },
        run: function() {
            Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.TRIGGER_REFRESH_MONITOR);

        }
    }
};