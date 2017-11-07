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
            var dom = `<foreignObject><div 
                            class='u-drag'
                            data-cfg_type="${this.type}"
                            data-cfg-uuid="J_uuid_${Base.uuid()}"
                            style="
                            width: 300px;
                            height: 300px;
                            border-color: black;
                            border-radius: 50%;
                            border-style: solid;">
                       </div></foreignObject>`;
            return dom;
        }
    },
    {
        type: Base.CONST_DOM_TYPE.DOMTYPE_SIMPLESHAPE,
        name: '矩形',
        desc: '矩形',
        groupName: groups.shape,
        renderToCanvas: function () {
            var dom = `<foreignObject><div 
                            class='u-drag'
                            data-cfg_type="${this.type}"
                            data-cfg-uuid="J_uuid_${Base.uuid()}"
                            style="
                            width: 300px;
                            height: 300px;
                            border-color: black;
                            border-radius: 4px;
                            border-style: solid;">
                       </div></foreignObject>`;
            return dom;
        }
    },
    {
        type: Base.CONST_DOM_TYPE.DOMTYPE_SVG,
        name: '直线',
        desc: '直线',
        groupName: groups.shape,
        renderToCanvas: function () {
            var dom = `  
                    <polyline data-cfg_type="${this.type}"
                    data-cfg-uuid="J_uuid_${Base.uuid()}"  id="can-drag-line" points="10,120 60,10 "
                    style="stroke:#29e;stroke-width:2;fill:none;"/> `;
            return dom;
        }
    },
    {
        type: Base.CONST_DOM_TYPE.DOMTYPE_SVG,
        name: '折线',
        desc: '折线',
        groupName: groups.shape,
        renderToCanvas: function () {
            var dom = `
                <polyline data-cfg_type="${this.type}"
                data-cfg-uuid="J_uuid_${Base.uuid()}"  id= "can-drag-line" points= "10,120 60,10 180,10"
            style = "stroke:#29e;stroke-width:2;fill:none;" />` ;
            return dom;
        }
    }
];
array.forEach(function (element) {
    result.push(element);
}, this);
module.exports = result;