var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var store = require('modules/monitoring/dataService/store.es');
var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');
var domUtil = require('modules/util/dom/domUtil.es');
var domUtil = require('modules/util/dom/domUtil.es');
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

    },
    methods: {
        refresh() {
            $container().html($container().html());
            this.bindEvent();
        },
        setHtml: function () {
            console.log(store.currentCfg.html);
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
            console.log(array);
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
                            console.log('run charts');
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
            if (this.rightClickDom) {
                var $forObject = $(this.rightClickDom).closest('foreignObject');
                if ($forObject.length === 0) {
                    // 说明是线条
                    var $forObject = $(this.rightClickDom).closest('g');
                }
                removeDom($forObject);
                self.refresh();
            }
        },
        tool_copy: function () {
            var self = this;
            function copyDom(newDom) {
                var newUuid = baseSetting.getDomUuid();
                var $clone = $(newDom).clone(true);
                var trueDom = $clone.find('[data-cfg-uuid]')[0];
                trueDom.setAttribute('data-cfg-uuid', newUuid);
                $clone.appendTo($container());
                var arrayXY = baseSetting.getComputedTranslateXY(trueDom);
                baseSetting.moveTarget(trueDom,
                    0,
                    10 + $(trueDom).height());
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
                    10 + $(trueDom).height());
            }
            if (this.rightClickDom) {
                // 只有foreignObject 才可以复制
                var $forObject = $(this.rightClickDom).closest('foreignObject');
                if ($forObject.length > 0) {

                    copyDom($forObject);
                }
                var $forObject = $(this.rightClickDom).closest('g');
                if ($forObject.length > 0) {
                    // 说明是线条
                    copySvg($forObject);
                }
                self.refresh();
            }
        }
    }
};