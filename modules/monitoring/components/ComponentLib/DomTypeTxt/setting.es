var Base = require('modules/monitoring/Base.es');
var interact = require('modules/lib/interact/interact.js');
var domUtil = require('modules/util/dom/domUtil.es');
var commonAttrSet = require('modules/monitoring/components/ComponentLib/components/CommonAttr/commonAttrSet.es');
var store = require('modules/monitoring/dataService/store.es');
var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');
module.exports = {
    type: Base.CONST_DOM_TYPE.DOMTYPE_TXT,
    icon: 'fa fa-text-width',
    name: '文本',
    desc: '文本类型',
    renderToCanvas: function () {
        var dom = `<div 
        style=' min-width: 50px;
        min-height: 50px;
        text-align: center;
        '
            class='u-drag'
            data-cfg_type="${this.type}"
            data-cfg-uuid="J_uuid_${Base.uuid()}">文本</div>`;
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
    monitorCallBack: function (uuid) {
        baseSetting.monitorCallBack(uuid);
    },
    bindOutputVar: function (uuid) {
        var dom = domUtil.getDomByuuid(uuid);
        function justBindVar(dom) {
            var attrs = domUtil.getAttributes($(dom));
            $(dom).html(
                (attrs['data-prefix'] || "") +
                store.getValueByVar(attrs['data-cfg_var_binded_ouput'], attrs['data-cfg_fix_num']) +
                (attrs['data-suffix'] || "")
            );
        }
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
                    // if (key == 'fontSize') {
                    //     dom.style[key] = element + 'px';
                    // } else {
                    dom.style[key] = element;
                    // }
                }

            }
        }
        Base.eventEmitter.addListener(Base.CONST_EVENT_NAME.TRIGGER_REFRESH_MONITOR, function () {
            justBindVar(dom);
            baseSetting.switchOperator(uuid, setCallback);
        });
    }
};