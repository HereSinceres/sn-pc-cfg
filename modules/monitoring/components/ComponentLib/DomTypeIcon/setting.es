var Base = require('modules/monitoring/Base.es');
var interact = require('modules/lib/interact/interact.js');
var domUtil = require('modules/util/dom/domUtil.es');
var commonAttrSet = require('modules/monitoring/components/ComponentLib/com/CommonAttr/commonAttrSet.es');


var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');

module.exports = {
    type: Base.CONST_DOM_TYPE.DOMTYPE_ICON,
    name: '按钮',
    desc: '按钮类型',
    renderToCanvas: function () {
        var dom = `<foreignObject><div 
            style=' 
            width: 50px;
            height: 50px;
            text-align: center;
            '
            class='u-drag'
            data-cfg_type="${this.type}"
            data-cfg-uuid="J_uuid_${Base.uuid()}">
                <span class='iconcfgfont icon-cfg-btn2'></span>
            </div></foreignObject>`;
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
                    // 可过滤数据 

                    if (element) {
                        if (key == 'icon') {
                            $(dom).find('span').attr('class', element);
                        } else {
                            dom.style[key] = element;
                        }
                    }
                }

            }
        }
        Base.eventEmitter.addListener(Base.CONST_EVENT_NAME.TRIGGER_REFRESH_MONITOR, function () {
            baseSetting.switchOperator(uuid, setCallback);
        });
    }
};