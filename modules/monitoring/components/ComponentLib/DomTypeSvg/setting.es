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
        var dom = `<svg 
                        class='u-drag'
                        data-cfg_type="${this.type}"
                        data-cfg-uuid="J_uuid_${Base.uuid()}"
                        xmlns="http://www.w3.org/2000/svg"> 
                        <path d="M 10 75 Q 50 10 100 75 T 190 75" stroke="black"
                            stroke-linecap="round" stroke-dasharray="5,10,5" fill="none"/>
                        <path d="M 10 75 L 190 75" stroke="red"
                            stroke-linecap="round" stroke-width="1" stroke-dasharray="5,5" fill="none"/>
                   </svg>`;
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
        var root = domUtil.getDomByuuid(uuid);
        var sns = "http://www.w3.org/2000/svg",
            xns = "http://www.w3.org/1999/xlink",
            star = $(root).find('#edit-star')[0],
            rootMatrix,
            originalPoints = [],
            transformedPoints = [];

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
                    root.setAttribute('class', '');
                },
                snap: {
                    targets: originalPoints,
                    range: 10,
                    relativePoints: [{ x: 0.5, y: 0.5 }]
                },
                restrict: { restriction: document.rootElement }
            })
            .styleCursor(false);

    },
    monitorCallBack: function (uuid) {
        var dom = domUtil.getDomByuuid(uuid);
        var data = $(dom).data();
        baseSetting.monitorCallBack(uuid);
        // 获取dom上的data 属性 根据 data 属性修改数据
        console.log(data.cfg_var_binded_ouput);
        $(dom).html(store.getValueByVar(data.cfg_var_binded_ouput));
    }
};