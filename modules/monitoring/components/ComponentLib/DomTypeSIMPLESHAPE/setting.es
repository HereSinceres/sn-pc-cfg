var Base = require('modules/monitoring/Base.es');
var interact = require('modules/lib/interact/interact.js');
var domUtil = require('modules/util/dom/domUtil.es');
var commonAttrSet = require('modules/monitoring/components/ComponentLib/com/CommonAttr/commonAttrSet.es');

var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');
module.exports = {
    type: Base.CONST_DOM_TYPE.DOMTYPE_SIMPLESHAPE,
    name: '简单图形',
    desc: '简单图形',
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
        function setCallback(dom, callback) {
            var object = {};
            // 行转列
            callback.forEach(function (element) {
                object[element.attr] = element.value;
            }, this);
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    var element = object[key];
                    if (element) {
                        // 可过滤数据
                        // if (key == 'fontSize') {
                        //     dom.style[key] = element + 'px';
                        // } else {  
                        dom.style[key] = element;
                    }
                    // }
                }

            }
            // 获取dom上的data 属性 根据 data 属性修改数据
            var data = $(dom).data();
        }
        Base.eventEmitter.addListener(Base.CONST_EVENT_NAME.TRIGGER_REFRESH_MONITOR, function () {
            baseSetting.switchOperator(uuid, setCallback);
        });
    }
};