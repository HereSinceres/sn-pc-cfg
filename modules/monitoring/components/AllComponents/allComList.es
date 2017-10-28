var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var Base = require('modules/monitoring/Base.es');
var result = comlib.slice();
var groups = {
    base: '基本组件',
    shape: '形状'
};
result = result.filter(function (ele) {
    if (ele.type === Base.CONST_DOM_TYPE.DOMTYPE_SIMPLESHAPE) {
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
    }
];
array.forEach(function (element) {
    result.push(element);
}, this);
module.exports = result;