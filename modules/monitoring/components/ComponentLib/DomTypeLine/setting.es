var Base = require('modules/monitoring/Base.es');
var interact = require('modules/lib/interact/interact.js');
var domUtil = require('modules/util/dom/domUtil.es');
var commonAttrSet = require('modules/monitoring/components/ComponentLib/components/CommonAttr/commonAttrSet.es');

var variable = require('modules/monitoring/dataService/variable.es');
var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');
module.exports = {
    id: 1,
    type: Base.CONST_DOM_TYPE.DOMTYPE_LINE,
    name: '直线',
    desc: '直线',
    renderToPaintDom: function () {
        var dom = `<svg 
                        class='u-drag'
                        data-cfg_type="${this.type}"
                        data-cfg-uuid="J_uuid_${Base.uuid()}"
                        xmlns="http://www.w3.org/2000/svg"> 
                        <line x1="0" y1="50%" x2="100%" y2="50%" stroke-width="1" stroke="black"></line>
                   </svg>`;
        return dom;
    },
    bindDragEvent: function (dom) {
        baseSetting.bindDragEvent(dom);
    },
    bindOpenSetEvent: function (dom) {
        var $dom = $(dom);
        $dom.dblclick(function () {
            var data = $(this).data();
            // 广播事件打开设置弹窗  传递过去数据
            // SHOW_UNIT_CONFIG
            Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.SHOW_UNIT_CONFIG, [$dom, data]);
        });
    },
    monitorCallBack: function (dom) {
        var data = $(dom).data();
        baseSetting.monitorCallBack(dom);
        // 获取dom上的data 属性 根据 data 属性修改数据
        console.log(data.cfg_var_binded_ouput);
        $(dom).html(variable.getItem()[data.cfg_var_binded_ouput]);
    }
};