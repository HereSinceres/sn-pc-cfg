var Base = require('modules/monitoring/Base.es');
var interact = require('modules/lib/interact/interact.js');
var domUtil = require('modules/util/dom/domUtil.es');
var commonAttrSet = require('modules/monitoring/components/ComponentLib/com/CommonAttr/commonAttrSet.es');
var store = require('modules/monitoring/dataService/store.es');
var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');
var $container = function () {
    return $('.J-wrapper');
};

module.exports = {
    type: Base.CONST_DOM_TYPE.DOMTYPE_SVG,
    name: 'SVG',
    desc: '自定义SVG',
    renderToCanvas: function () {
        // TODO
        var dom = `  
                <polyline data-cfg_type="${this.type}"
                data-cfg-uuid="J_uuid_${Base.uuid()}" id="can-drag-line" points="10,120 60,10 180,10"
                style=""/> 
        
       `;
        return dom;
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
    }
};