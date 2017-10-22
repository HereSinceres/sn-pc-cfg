var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var store = require('modules/monitoring/dataService/store.es');
var mulSel = require('modules/monitoring/components/ContentWrapper/mulSel.es');
var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');
module.exports = {
    components: {},
    data: function () {
        return {
            comlib: comlib,
            rightClickDom: null
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        var self = this;

        function callBack(item) {
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
        setHtml: function () {
            var self = this;
            if (store.currentCfg.html) {
                var html = decodeURI(store.currentCfg.html);
                $(self.$el).find('.J-wrapper').replaceWith(html);
            }
        },
        init: function () {
            var self = this;
            this.setHtml(); 
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
        tool_del: function () {
            if (this.rightClickDom) {
                if ($(this.rightClickDom).hasClass('u-drag')) {
                    $(this.rightClickDom).remove();
                } else {
                    $(this.rightClickDom).closest('.u-drag').remove();
                }
            }

        },
        tool_set: function () {
            // 模拟点击双击，当前功能可不用
            $(this.rightClickDom).dblclick();
        },
        tool_copy: function () {
            // 有bug TODO 
            if (this.rightClickDom) {
                var newDom = null;
                if ($(this.rightClickDom).hasClass('u-drag')) {
                    newDom = $(this.rightClickDom);
                } else {
                    // newDom = $(this.rightClickDom).closest('.u-drag');
                }
                var $clone = $(newDom).clone(true);
                $clone.data('cfgUuid', baseSetting.getDomUuid())
                if (newDom) {
                    $clone.appendTo('.J-wrapper');
                    this.init();
                }
            }
        }
    }
};