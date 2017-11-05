var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var Base = require('modules/monitoring/Base.es');
var result = comlib.slice();
var groups = {
    base: '基本组件',
    shape: '形状',
    chart: '图表'
};
result = result.filter(function (ele) {
    var groupName = groups.base;
    // 隐藏基本图形
    if (ele.type === Base.CONST_DOM_TYPE.DOMTYPE_SIMPLESHAPE) {
        return false;
    }
    // 隐藏自定义SVG
    if (ele.type === Base.CONST_DOM_TYPE.DOMTYPE_SVG) {
        return false;
    }
    if (ele.type === Base.CONST_DOM_TYPE.DOMTYPE_SVG) {
        return false;
    }
    if (ele.type === Base.CONST_DOM_TYPE.DOMTYPE_ECHARTSLINE) {
        groupName = groups.chart;
    }
    if (ele.type === Base.CONST_DOM_TYPE.DOMTYPE_ECHARTSGAUGE) {
        groupName = groups.chart;
    }
    ele.groupName = groupName;
    return true;
});
var array = [
    {
        type: Base.CONST_DOM_TYPE.DOMTYPE_SIMPLESHAPE,
        name: '圆形',
        desc: '圆形',
        groupName: groups.shape,
        renderToCanvas: function () {
            var dom = `<div 
                            class='u-drag'
                            data-cfg_type="${this.type}"
                            data-cfg-uuid="J_uuid_${Base.uuid()}"
                            style="
                            width: 300px;
                            height: 300px;
                            border-color: black;
                            border-radius: 50%;
                            border-style: solid;">
                       </div>`;
            return dom;
        }
    },
    {
        type: Base.CONST_DOM_TYPE.DOMTYPE_SIMPLESHAPE,
        name: '矩形',
        desc: '矩形',
        groupName: groups.shape,
        renderToCanvas: function () {
            var dom = `<div 
                            class='u-drag'
                            data-cfg_type="${this.type}"
                            data-cfg-uuid="J_uuid_${Base.uuid()}"
                            style="
                            width: 300px;
                            height: 300px;
                            border-color: black;
                            border-radius: 4px;
                            border-style: solid;">
                       </div>`;
            return dom;
        }
    },
    {
        type: Base.CONST_DOM_TYPE.DOMTYPE_SVG,
        name: '直线',
        desc: '直线',
        groupName: groups.shape,
        renderToCanvas: function () {
            var dom = ` <svg
            class='u-drag'
            data-cfg_type="${this.type}"
            data-cfg-uuid="J_uuid_${Base.uuid()}"
            xmlns="http://www.w3.org/2000/svg" style="stroke:#29e;stroke-width:2"> 
                    <defs>
                        <circle id="point-handle"
                            r="3" x="0" y="0"
                            stroke-width="2"
                            fill="#808080"
                            fill-opacity="0.8"
                            stroke="#808080"/>
                    </defs>
                    <polyline  id="can-drag-line" points="10,120 60,10 "
                    style="fill:none;"/>
            </svg>`;
            return dom;
        }
    },
    {
        type: Base.CONST_DOM_TYPE.DOMTYPE_SVG,
        name: '折线',
        desc: '折线',
        groupName: groups.shape,
        renderToCanvas: function () {
            var dom = ` <svg
            class='u-drag'
            data-cfg_type="${this.type}"
            data-cfg-uuid="J_uuid_${Base.uuid()}"
            xmlns="http://www.w3.org/2000/svg" style="stroke:#29e;stroke-width:2"> 
                    <defs>
                        <circle id="point-handle"
                            r="3" x="0" y="0"
                            stroke-width="2"
                            fill="#808080"
                            fill-opacity="0.8"
                            stroke="#808080"/>
                    </defs>
                    <polyline  id="can-drag-line" points="10,120 60,10 180,10"
                    style="fill:none;"/>
            </svg>`;
            return dom;
        }
    }
];
array.forEach(function (element) {
    result.push(element);
}, this);
module.exports = result;