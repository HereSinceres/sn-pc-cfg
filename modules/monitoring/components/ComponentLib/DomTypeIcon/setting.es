var Base = require('modules/monitoring/Base.es');
var interact = require('modules/lib/interact/interact.js');
var domUtil = require('modules/util/dom/domUtil.es');
var commonAttrSet = require('modules/monitoring/components/ComponentLib/components/CommonAttr/commonAttrSet.es');

var variable = require('modules/monitoring/dataService/variable.es');
var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');
var baseSettingClass = require('modules/monitoring/components/ComponentLib/baseSettingClass.es');
class className extends baseSettingClass {
    constructor() {
        super();
        type: Base.CONST_DOM_TYPE.DOMTYPE_ICON
        this.name = '图标类型'
        this.desc = '图标类型'
    }
    renderToCanvas() {
        var dom = `<div 
            class='u-drag'
            data-cfg_type="${this.type}"
            data-cfg-uuid="J_uuid_${Base.uuid()}">
                <span class='fa fa-lightbulb-o'></span>
            </div>`;
        return dom;
    }
    monitorCallBack(dom) {
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
            baseSetting.switchOperator(dom, setCallback);
        });

    }
};
module.exports = className;