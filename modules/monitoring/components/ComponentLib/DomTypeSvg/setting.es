var Base = require('modules/monitoring/Base.es');
var interact = require('modules/lib/interact/interact.js');
var domUtil = require('modules/util/dom/domUtil.es');
var commonAttrSet = require('modules/monitoring/components/ComponentLib/components/CommonAttr/commonAttrSet.es');
var store = require('modules/monitoring/dataService/store.es');
var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');
module.exports = {
    type: Base.CONST_DOM_TYPE.DOMTYPE_SVG,
    name: 'SVG',
    desc: '自定义SVG',
    renderToCanvas: function () {
        var dom = ` 
        <svg
        class='u-drag'
        data-cfg_type="${this.type}"
        data-cfg-uuid="J_uuid_${Base.uuid()}"
        xmlns="http://www.w3.org/2000/svg" > 
                <defs>
                    <circle id="point-handle"
                        r="3" x="0" y="0"
                        stroke-width="2"
                        fill="#808080"
                        fill-opacity="0.8"
                        stroke="#808080"/>
                </defs>
                <polyline  id="can-drag-line" points="10,120 60,10 180,10"
                style=""/>
        </svg>
        
       `;
        return dom;
    },
    bindDragEvent: function (uuid) {
        var dom = domUtil.getDomByuuid(uuid);
        baseSetting.bindDragEvent(uuid);
    },
    bindOpenSetEvent: function (uuid) {
        var dom = domUtil.getDomByuuid(uuid);
        var $dom = $(dom);
        $dom.dblclick(function () {
            var data = $(this).data();
            // 广播事件打开设置弹窗  传递过去数据
            // SHOW_UNIT_CONFIG
            Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.SHOW_UNIT_CONFIG, [uuid]);
        });
    },
    runSvg: function (uuid) {
        try {
            (function (uuid) {
                var root = domUtil.getDomByuuid(uuid);
                var sns = "http://www.w3.org/2000/svg",
                    xns = "http://www.w3.org/1999/xlink",
                    star = $(root).find('#can-drag-line')[0],
                    rootMatrix,
                    originalPoints = [],
                    transformedPoints = [];

                $(root).find('.point-handle').remove();

                for (var i = 0, len = star.points.numberOfItems; i < len; i++) {
                    var handle = document.createElementNS(sns, 'use'),
                        point = star.points.getItem(i),
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
                    var array = $(root).find('.point-handle');
                    for (var index = 0; index < array.length; index++) {
                        var element = array[index];
                        interact(element).draggable({
                            snap: {
                                targets: transformedPoints,
                                range: 20 * Math.max(rootMatrix.a, rootMatrix.d)
                            }
                        });
                    }
                }

                interact(root)
                    .on('mousedown', applyTransforms)
                    .on('touchstart', applyTransforms);
                var array = $(root).find('.point-handle');
                for (var index = 0; index < array.length; index++) {
                    var element = array[index];
                    interact(element)
                        .draggable({
                            onstart: function (event) {
                                root.setAttribute('class', 'dragging');
                            },
                            onmove: function (event) {
                                var i = event.target.getAttribute('data-index') | 0,
                                    point = star.points.getItem(i);

                                point.x += event.dx / rootMatrix.a;
                                point.y += event.dy / rootMatrix.d;

                                event.target.x.baseVal.value = point.x;
                                event.target.y.baseVal.value = point.y;
                            },
                            onend: function (event) {
                                setTimeout(function () {
                                    root.setAttribute('class', 'u-drag');
                                }, 1000);
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

            })(uuid);
        } catch (error) {

        }
    }
};