var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var store = require('modules/monitoring/dataService/store.es');
var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');
var domUtil = require('modules/util/dom/domUtil.es');
var mulSel = require('modules/monitoring/components/ContentWrapper/mulSel.es');

var $container = function () {
    return $('.J-wrapper');
};

function closeMenu() {
    $('.context-menu').removeClass('open');
}
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

        function callBack(html) {
            $container().append(html);
            self.refresh();
        }
        Base.eventEmitter.addListener(Base.CONST_EVENT_NAME.ADD_NEWUNIT, callBack);
        // 初始化项目
        self.setHtml();
        self.bindEvent();
        Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.TRIGGER_REFRESH_MONITOR);
        $('.g-mn5c').scroll(function () { 
            window.__select_ele__ = [];
            $('.select-helper').remove();
        })
    },
   
    methods: {
        refresh() {
            $container().html($container().html());
            this.bindEvent();


        },
        setHtml: function () {
            var self = this;
            if (store.currentCfg.html) {
                var html = decodeURI(store.currentCfg.html);
                $container().replaceWith(html);
            }
        },
        bindEvent: function () {
            var self = this;
            var array = [];
            array = $container().find('[data-cfg-uuid]');
            for (var index = 0; index < array.length; index++) {
                var dom = array[index];
                var attrs = domUtil.getAttributes($(dom));
                var uuid = attrs['data-cfg-uuid'];
                comlib.forEach(function (element) {
                    if (attrs['data-cfg_type'] === element.type) {
                        // 添加设置事件
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

                        // 初始化monitorCallBack
                        if (element.monitorCallBack) {
                            element.monitorCallBack(uuid);
                        }
                        // 初始化绑定输出变量
                        if (element.bindOutputVar) {
                            element.bindOutputVar(uuid);
                        }
                    }
                }, this);
            }
            self.bindRightClickEvent();
        },
        bindRightClickEvent: function () {
            var self = this;
            $('[data-cfg-uuid]').contextmenu({
                target: '.context-menu',
                before: function (e) {
                    self.rightClickDom = e.target;

                    e.preventDefault();
                    return true;
                }
            });
        },

        tool_set: function () {
            // 模拟点击双击，当前功能可不用
            $(this.rightClickDom).click();
            closeMenu();
        },
        tool_del: function () {
            var self = this;
            function removeDom(dom) {
                $(dom).remove();
                closeMenu();
            }
            function del(dom) {
                if (dom) {
                    var $forObject = $(dom).closest('foreignObject') || $(dom);
                    if ($forObject.length === 0) {
                        // 说明是线条
                        var $forObject = $(dom).closest('g');
                    }
                    removeDom($forObject);
                }
            }
            var selectItms = window.__select_ele__.slice();
            if (selectItms.length) {
                for (var index = 0; index < selectItms.length; index++) {
                    var element = selectItms[index];
                    if (element) {
                        del(element);
                    }
                }
            } else {
                del(this.rightClickDom);
            }
            self.refresh();
        },
        tool_copy: function () {
            var self = this;

            var maxWidth = 10;
            function copyDom(newDom) {
                var newUuid = baseSetting.getDomUuid();
                var $clone = $(newDom).clone(true);
                var trueDom = $clone.find('[data-cfg-uuid]')[0];
                trueDom.setAttribute('data-cfg-uuid', newUuid);
                $clone.appendTo($container());
                var arrayXY = baseSetting.getComputedTranslateXY(trueDom);
                baseSetting.moveTarget(trueDom,
                    maxWidth + 10,
                    0);
            }
            function copySvg(newDom) {
                var newUuid = baseSetting.getDomUuid();
                var $clone = $(newDom).clone(true);
                var trueDom = $clone[0];
                trueDom.setAttribute('data-cfg-uuid', newUuid);
                $clone.appendTo($container());
                var arrayXY = baseSetting.getComputedTranslateXY(trueDom);
                baseSetting.moveTarget(trueDom,
                    0,
                    10 + $(trueDom).height() + $('.select-helper').height())
            }
            function copy(element) {
                // 只有foreignObject 才可以复制 
                var $forObject = $(element).closest('foreignObject') || $(element);
                if ($forObject.length > 0) {
                    copyDom($forObject);
                }
                var $forObject = $(element).closest('g') || $(element);
                if ($forObject.length > 0) {
                    // 说明是线条
                    copySvg($forObject);
                }
            }
            var selectItms = window.__select_ele__.slice();
            if (selectItms.length) {
                maxWidth = 0;
                for (var index = 0; index < selectItms.length; index++) {
                    var element = selectItms[index];
                    if (element) {
                        if ($(element).width() > maxWidth) {
                            maxWidth = $(element).width();
                        }
                    }
                };
                maxWidth = $('.select-helper').width() > maxWidth ? $('.select-helper').width() : maxWidth;
                for (var index = 0; index < selectItms.length; index++) {
                    var element = selectItms[index];
                    if (element) {
                        copy(element);
                    }
                }
            } else {
                copy(this.rightClickDom);
            }
            self.refresh();
        }
    }
};