var Base = require('modules/monitoring/Base.es');
var interact = require('modules/lib/interact/interact.js');
var domUtil = require('modules/util/dom/domUtil.es');
var commonAttrSet = require('modules/monitoring/components/ComponentLib/com/CommonAttr/commonAttrSet.es');
var store = require('modules/monitoring/dataService/store.es');
var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');
var $container = function () {
    return $('.J-wrapper');
};
function bindSvgPoint(uuid) {
    var root = $container()[0];
    var sns = "http://www.w3.org/2000/svg",
        xns = "http://www.w3.org/1999/xlink",
        rootMatrix,
        originalPoints = [],
        transformedPoints = [];
    var allPoints = [];
    var star = $(domUtil.getDomByuuid(uuid)).find('#can-drag-line')[0];
    if (star.points) {
        for (var ssss = 0; ssss < star.points.numberOfItems; ssss++) {
            var element = star.points.getItem(ssss);
            allPoints.push(element)
        }
    }
    for (var i = 0, len = allPoints.length; i < len; i++) {
        var point = allPoints[i],
            newPoint = root.createSVGPoint();

        originalPoints.push(newPoint);
        function makeSVG(tag, attrs) {
            var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
            for (var k in attrs)
                el.setAttribute(k, attrs[k]);
            return el;
        }
        var circle = makeSVG('circle', {
            cx: point.x, cy: point.y, r: 10,
            stroke: '#8a2da5', 'stroke-width': 2, fill: '#8a2da5',
            'class': 'point-handle',
            'data-index': i
        }); domUtil.getDomByuuid(uuid).appendChild(circle);

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
                try {
                    var i = event.target.getAttribute('data-index') | 0,
                        point = allPoints[i];

                    point.x += event.dx / rootMatrix.a;
                    point.y += event.dy / rootMatrix.d;
                    point.x = Math.ceil(point.x);
                    point.y = Math.ceil(point.y);
                    event.target.cx.baseVal.value = point.x;
                    event.target.cy.baseVal.value = point.y;
                } catch (error) {

                }
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
module.exports = {
    type: Base.CONST_DOM_TYPE.DOMTYPE_SVG,
    name: 'SVG',
    desc: '自定义SVG',
    renderToCanvas: function () {
        var dom = ` 
        <g
        class='u-drag'
        data-cfg_type="${this.type}"
        data-cfg-uuid="J_uuid_${Base.uuid()}"
        xmlns="http://www.w3.org/2000/svg" > 
                   <polyline  id="can-drag-line" points="10,120 60,10 180,10"
                style=""/>
        </g>
        
       `;
        return dom;
    },
    bindDragEvent: function (uuid) {
        var dom = domUtil.getDomByuuid(uuid);
        baseSetting.bindDragEvent(uuid);
        this.bindmouseEnterEvent(uuid);
    },
    bindmouseEnterEvent: function (uuid) {
        removeCircle();
        var dom = domUtil.getDomByuuid(uuid);
        function callbackMouseOver() {
            if ($('.point-handle').length > 0) {
                return;
            }
            bindSvgPoint(uuid);
        }
        function removeCircle() {
            // 删除所有点 
            setTimeout(function () {
                $('#point-handle').remove();
                $('.point-handle').remove();
            }, 2000);
        }
        $(dom).mouseenter(callbackMouseOver);
        $(dom).mouseout(removeCircle);

    },

    monitorCallBack: function (uuid) {
        baseSetting.monitorCallBack(uuid);
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
    bindOutputVar: function (uuid) {
        var dom = domUtil.getDomByuuid(uuid);
        function setCallback(dom, callback) {
             
            var object = {};
            // 行转列
            callback.forEach(function (element) {
                object[element.attr] = element.value;
            }, this);
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    var element = object[key];
                    // 可过滤数据

                    if (element) {
                        dom.style[key] = element;
                    }
                }

            }
        }
        Base.eventEmitter.addListener(Base.CONST_EVENT_NAME.TRIGGER_REFRESH_MONITOR, function () {

            baseSetting.switchOperator(uuid, setCallback);
        });
    }
};