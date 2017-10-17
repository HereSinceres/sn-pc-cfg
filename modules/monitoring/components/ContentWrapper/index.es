var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var cfgSet = require('modules/monitoring/dataService/cfgSet.es');
module.exports = {
    components: {},
    data: function () {
        return {
            comlib: comlib,
            rightClickDom: null,
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
        var self = this;

        function callBack(item) {
            console.log(item);
            var html = item.renderToCanvas();
            var $html = $.parseHTML(html);
            // 添加dom to paint  
            $(self.$el).find('.J-wrapper').append($html);
            // 绑定拖拽事件
            if (item.bindDragEvent) {
                item.bindDragEvent($html[0]);
            }
            // 添加弹窗事件
            if (item.bindOpenSetEvent) {
                item.bindOpenSetEvent($html[0]);
            }
            // 设置默认样式
            if (item.setDefaultStyle) {
                item.setDefaultStyle(self.$el, $html[0])
            }
            self.bindRightClickEvent();
        }
        Base.eventEmitter.addListener(Base.CONST_EVENT_NAME.ADD_NEWUNIT, callBack);

        // 初始化项目
        self.init();

    },
    methods: {
        init: function () {
            var self = this;
            if (cfgSet.getItem()) {
                $(self.$el).find('.J-wrapper').replaceWith(cfgSet.getItem());
            }
            $(self.$el).find('[data-cfg-uuid]').each(function () {
                var eleDom = this;
                var data = $(eleDom).data();
                comlib.forEach(function (element) {
                    if (data.cfg_type === element.type) {
                        // 绑定拖拽事件
                        element.bindDragEvent(eleDom);
                        // 添加弹窗事件
                        element.bindOpenSetEvent(eleDom);
                    }
                }, this);
            });
            self.bindRightClickEvent();

            var canvasDom = $(self.$el).find('.J-wrapper')[0];
            this.canvas.w = (parseFloat(canvasDom.style.width) || canvasDom.clientWidth || 0);
            this.canvas.h = (parseFloat(canvasDom.style.height) || canvasDom.clientHeight || 0);
            this.canvas.bg = canvasDom.style.backgroundColor;

        },
        saveDraft: function () {
            cfgSet.setItem($(this.$el).find('.J-wrapper')[0].outerHTML);
            $.notify({
                message: '保存成功'
            });
        },
        bindRightClickEvent: function () {
            var self = this;
            $('.u-drag').contextmenu({
                target: '.context-menu',
                before: function (e) {
                    self.rightClickDom = e.target;
                    e.preventDefault();
                    e.stopPropagation();
                    return true;
                }
            });
        },
        del: function () {
            if (this.rightClickDom) {
                if ($(this.rightClickDom).hasClass('u-drag')) {
                    $(this.rightClickDom).remove();
                } else {
                    $(this.rightClickDom).closest('.u-drag').remove();
                }
            }

        },
        set: function () {
            // 模拟点击双击，当前功能可不用
            $(this.rightClickDom).dblclick();
        },
        copy: function () {
            // 有bug TODO 
            if (this.rightClickDom) {
                var newDom = null;
                if ($(this.rightClickDom).hasClass('u-drag')) {
                    newDom = $(this.rightClickDom);
                } else {
                    newDom = $(this.rightClickDom).closest('.u-drag');
                }
                console.log(newDom);
                if (newDom) {
                    $(this.$el).find('.J-wrapper').append(newDom);
                    this.init();
                }
            }
        },
        toggleCanvasSet: function (isShow) {
            this.isShowCanvasSetDialog = isShow;
        },
        savePaintSet: function () {
            this.isShowCanvasSetDialog = 0;
            var canvasDom = $(this.$el).find('.J-wrapper')[0];
            if (canvasDom) {
                canvasDom.style.width = this.canvas.w + 'px';
                canvasDom.style.height = this.canvas.h + 'px';
                canvasDom.style.backgroundColor = this.canvas.bg;
            }
        }
    }
};