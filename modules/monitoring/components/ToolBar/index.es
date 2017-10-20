var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var api = require('modules/monitoring/dataService/api.es');
var store = require('modules/monitoring/dataService/store.es');
module.exports = {
    components: {},
    data: function () {
        return {
            isShowCanvasSetDialog: false,
            canvas: {
                w: null,
                h: null,
                bg: null
            }
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {


        var canvasDom = $('.J-wrapper')[0];
        this.canvas.w = (parseFloat(canvasDom.style.width) || canvasDom.clientWidth || 0);
        this.canvas.h = (parseFloat(canvasDom.style.height) || canvasDom.clientHeight || 0);
        this.canvas.bg = canvasDom.style.backgroundColor;
    },
    methods: {
        getHtml: function () {
            return $('.J-wrapper')[0].outerHTML;
        },
        saveDraft: function () {
            // TODO 没有做

            $.notify({
                message: '保存成功'
            });
        },
        toggleCanvasSet: function (isShow) {
            this.isShowCanvasSetDialog = isShow;
        },
        save: function () {
            var self = this;
            var data;
            store.cfgList.forEach(function (element) {
                if (element.id == self.$route.params.cfgId) {
                    data = element;
                }
            }, this);
            data.html =encodeURI( this.getHtml());
            api.UpdateCfgManagement(data).then(function () {
                alert('上传成功');
            })
        },

        savePaintSet: function () {
            this.isShowCanvasSetDialog = 0;
            var canvasDom = $('.J-wrapper')[0];
            if (canvasDom) {
                canvasDom.style.width = this.canvas.w + 'px';
                canvasDom.style.height = this.canvas.h + 'px';
                canvasDom.style.backgroundColor = this.canvas.bg;
            }
        }
    }
};