var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var store = require('modules/monitoring/dataService/store.es');
var mulSel = require('modules/monitoring/components/ContentWrapper/mulSel.es');
var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');

var $container = function() {
    return $('.J-wrapper');
};

function closeMenu() {
    $('.context-menu').removeClass('open');
}
module.exports = {
    components: {},
    data: function() {
        return {
            comlib: comlib,
            rightClickDom: null
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function() {
        var self = this;

        function callBack(element) {
            var html = element.renderToCanvas();
            var $html = $.parseHTML(html);
            var eleDom = $html[0];
            var uuid = $(eleDom).data('cfgUuid');
            // 添加dom to paint  
            $container().append($html);
            // 添加弹窗事件
            if (element.bindOpenSetEvent) {
                element.bindOpenSetEvent(uuid);
            }
            // 绑定拖拽事件
            if (element.bindDragEvent) {
                element.bindDragEvent(uuid);
            }
            // 设置默认样式
            if (element.setDefaultStyle) {
                element.setDefaultStyle(self.$el, eleDom);
            }
            // 初始化charts
            if (element.runChart) {
                element.runChart(uuid);
            }
            self.bindRightClickEvent();
        }
        Base.eventEmitter.addListener(Base.CONST_EVENT_NAME.ADD_NEWUNIT, callBack);
        // 初始化项目
        self.setHtml();
        self.bindEvent();

    },
    methods: {
        setHtml: function() {
            var self = this;
            if (store.currentCfg.html) {
                var html = decodeURI(store.currentCfg.html);
                $container().replaceWith(html);
            }
        },
        bindEvent: function(uuid) {
            var self = this;
            var array = [];
            if (uuid) {
                array = $(self.$el).find('[data-cfg-uuid=' + uuid + ']');
            } else {
                array = $(self.$el).find('[data-cfg-uuid]');
            }
            for (var index = 0; index < array.length; index++) {
                var eleDom = array[index];
                var data = $(eleDom).data();
                uuid = data['cfgUuid'];
                comlib.forEach(function(element) {
                    if (data.cfg_type === element.type) {

                        // 添加弹窗事件
                        if (element.bindOpenSetEvent) {
                            element.bindOpenSetEvent(uuid);
                        }
                        // 绑定拖拽事件
                        if (element.bindDragEvent) {
                            element.bindDragEvent(uuid);
                        }
                        // 初始化charts
                        if (element.runChart) {
                            element.runChart(uuid);
                        }
                    }
                }, this);
            }
            self.bindRightClickEvent();

        },
        bindRightClickEvent: function() {
            var self = this;
            $('.u-drag').contextmenu({
                target: '.context-menu',
                before: function(e) {
                    self.rightClickDom = e.target;
                    e.preventDefault();
                    return true;
                }
            });
        },
        tool_del: function() {
            function removeDom(dom) {
                $(dom).remove();
                closeMenu();
            }
            if (this.rightClickDom) {
                if (window.__select_ele__.length > 0) {
                    window.__select_ele__.forEach(function(element) {

                        removeDom($(element));
                    }, this);
                } else {
                    if ($(this.rightClickDom).hasClass('u-drag')) {
                        removeDom($(this.rightClickDom));
                    } else {
                        removeDom($(this.rightClickDom).closest('.u-drag'));
                    }
                }
            }
        },
        tool_set: function() {
            // 模拟点击双击，当前功能可不用
            $(this.rightClickDom).click();
            closeMenu();
        },
        tool_copy: function() {
            var self = this;

            function copyDom(newDom) {
                var newUuid = baseSetting.getDomUuid();
                var $clone = $(newDom).clone(true);
                $clone[0].setAttribute('data-cfg-uuid', newUuid);
                $clone.data('cfgUuid', newUuid);
                // 删除 echarts 属性
                $clone.removeAttr('_echarts_instance_');
                $clone.appendTo($container());
                self.bindEvent(newUuid);
            }
            if (this.rightClickDom) {
                if (window.__select_ele__.length > 0) {
                    window.__select_ele__.forEach(function(element) {
                        copyDom($(element));
                    }, this);
                } else {
                    var newDom = null;
                    if ($(this.rightClickDom).hasClass('u-drag')) {
                        newDom = $(this.rightClickDom);
                    } else {
                        newDom = $(this.rightClickDom).closest('.u-drag');
                    }
                    copyDom(newDom);
                }
            }
        }
    }
};