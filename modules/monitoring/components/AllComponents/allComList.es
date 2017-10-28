var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var Base = require('modules/monitoring/Base.es');
var result = comlib.slice();
var groups = {
    base: '基本组件',
    shape: '形状'
};
result = result.filter(function (ele) {
    // 隐藏基本图形
    if (ele.type === Base.CONST_DOM_TYPE.DOMTYPE_SIMPLESHAPE) {
        return false;
    }
    // 隐藏自定义SVG
    if (ele.type === Base.CONST_DOM_TYPE.DOMTYPE_SVG) {
        return false;
    }
    ele.groupName = groups.base;
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
                            min-width: 50px;
                            min-height: 50px;
                            border-color: red;
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
                            min-width: 50px;
                            min-height: 50px;
                            border-color: red;
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
            xmlns="http://www.w3.org/2000/svg" > 
                    <defs>
                        <circle id="point-handle"
                            r="3" x="0" y="0"
                            stroke-width="2"
                            fill="#fff"
                            fill-opacity="0.8"
                            stroke="#fff"/>
                    </defs>
                    <polyline  id="can-drag-line" points="10,120 60,10 "
                    style="fill:none;stroke:#29e;stroke-width:2"/>
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
            xmlns="http://www.w3.org/2000/svg" > 
                    <defs>
                        <circle id="point-handle"
                            r="3" x="0" y="0"
                            stroke-width="2"
                            fill="#fff"
                            fill-opacity="0.8"
                            stroke="#fff"/>
                    </defs>
                    <polyline  id="can-drag-line" points="10,120 60,10 180,10"
                    style="fill:none;stroke:#29e;stroke-width:2"/>
            </svg>`;
            return dom;
        }
    }
];
array.forEach(function (element) {
    result.push(element);
}, this);
module.exports = result;