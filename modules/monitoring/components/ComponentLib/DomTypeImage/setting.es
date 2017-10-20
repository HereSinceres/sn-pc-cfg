var Base = require('modules/monitoring/Base.es');
var interact = require('modules/lib/interact/interact.js');
var domUtil = require('modules/util/dom/domUtil.es');
var commonAttrSet = require('modules/monitoring/components/ComponentLib/components/CommonAttr/commonAttrSet.es');

var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');

module.exports = {
    id: 1,
    type: Base.CONST_DOM_TYPE.DOMTYPE_IMAGE,
    name: '图片类型',
    icon: 'fa fa-picture-o',
    desc: '图片类型',
    renderToCanvas: function () {
        var img = __uri('modules/monitoring/picLib/test_gif.gif');
        var dom = `<div 
            class='u-drag'
            data-cfg_type="${this.type}"
            data-cfg-uuid="J_uuid_${Base.uuid()}" style='
            background-image: url(${img});
            width:200px;
            height:200px;
            '> 
            </div>`;
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
        baseSetting.monitorCallBack(dom);

        function setCallback(dom, callback) {
            var object = {};
            // 行转列
            callback.forEach(function (element) {
                object[element.attr] = element.value;
            }, this);
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    var element = object[key];
                    // if (key == 'fontSize') {
                    //     dom.style[key] = element + 'px';
                    // } else {
                    dom.style[key] = element;
                    // }
                }

            }
        }
        Base.eventEmitter.addListener(Base.CONST_EVENT_NAME.TRIGGER_REFRESH_MONITOR, function () {
            baseSetting.switchOperator(dom, setCallback);
        });

    }
};