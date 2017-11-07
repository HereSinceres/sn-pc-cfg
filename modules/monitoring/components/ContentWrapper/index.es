var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var store = require('modules/monitoring/dataService/store.es');
var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');
var domUtil = require('modules/util/dom/domUtil.es');
var $container = function () {
    return $('.J-wrapper');
};
function bindSvgPoint() {
    var root = $container()[0];
    var sns = "http://www.w3.org/2000/svg",
        xns = "http://www.w3.org/1999/xlink",
        star = document.getElementById('edit-star'),
        rootMatrix,
        originalPoints = [],
        transformedPoints = [];
    var allPoints = [];
    // 删除所有点
    $(root).find('.point-handle').remove();
    var starArray = $container().find('[data-cfg-uuid]');
    console.log(starArray);
    for (var index = 0; index < starArray.length; index++) { 
        var star = starArray[index];
        if (star.points) {
            for (var ssss = 0; ssss < star.points.numberOfItems; ssss++) {
                var element = star.points.getItem(ssss);
                allPoints.push(element)
            }
        }
    }
    console.log(allPoints);
    for (var i = 0, len = allPoints.length; i < len; i++) {
        var handle = document.createElementNS(sns, 'use'),
            point = allPoints[i],
            newPoint = root.createSVGPoint();

        handle.setAttributeNS(xns, 'href', '#point-handle');
        handle.setAttribute('class', 'point-handle');

        handle.x.baseVal.value = newPoint.x = point.x;
        handle.y.baseVal.value = newPoint.y = point.y;

        handle.setAttribute('data-index', i);

        originalPoints.push(newPoint);

        root.appendChild(handle);
    }

    function applyTransforms(event) {
        rootMatrix = root.getScreenCTM();

        transformedPoints = originalPoints.map(function (point) {
            return point.matrixTransform(rootMatrix);
        });

        interact('.point-handle').draggable({
            snap: {
                targets: transformedPoints,
                range: 20 * Math.max(rootMatrix.a, rootMatrix.d)
            }
        });
    }

    interact(root)
        .on('mousedown', applyTransforms)
        .on('touchstart', applyTransforms);

    interact('.point-handle')
        .draggable({
            onstart: function (event) {
            },
            onmove: function (event) {
                var i = event.target.getAttribute('data-index') | 0,
                    point = allPoints[i];

                point.x += event.dx / rootMatrix.a;
                point.y += event.dy / rootMatrix.d;

                event.target.x.baseVal.value = point.x;
                event.target.y.baseVal.value = point.y;
            },
            onend: function (event) {
            },
            snap: {
                targets: originalPoints,
                range: 10,
                relativePoints: [{ x: 0.5, y: 0.5 }]
            },
            restrict: { restriction: document.rootElement }
        })
        .styleCursor(false);

}
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
            for (var index = 0; index < array.length; index++) {
                var dom = array[index];
                var attrs = domUtil.getAttributes($(dom));
                var uuid = attrs['data-cfg-uuid'];
                comlib.forEach(function (element) {
                    if (attrs['data-cfg_type'] === element.type) {

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
            bindSvgPoint();
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
                debugger
                var $forObject = $(this.rightClickDom).closest('foreignObject');
                if ($forObject.length === 0) {
                    // 说明是线条
                    $forObject = $(this.rightClickDom);
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
                $clone.find('[data-cfg-uuid]')[0].setAttribute('data-cfg-uuid', newUuid);
                $clone.appendTo($container());
            }
            if (this.rightClickDom) {
                // 只有foreignObject 才可以复制
                var $forObject = $(this.rightClickDom).closest('foreignObject');
                copyDom($forObject);
                self.refresh();
            }
        }
    }
};