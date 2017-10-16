var Base = require('modules/monitoring/Base.es');
var interact = require('modules/lib/interact/interact.js');
var domUtil = require('modules/util/dom/domUtil.es');
var commonAttrSet = require('modules/monitoring/components/ComponentLib/components/CommonAttr/commonAttrSet.es');

var variable = require('modules/monitoring/dataService/variable.es');
var operatorList = {
    equal: '==',
    notEqual: '!=',
    greaterThan: '>',
    greaterThanOrEqual: '>=',
    lessThan: '<',
    lessThanOrEqual: '<='
};
module.exports = {
    monitorCallBack: function (dom) {
        var data = $(dom).data();
        switch (data.cfg_attr_input) {
            case 1:
                // console.log('什么都不做');
                break;
            case 2:
                $(dom).click(function () {
                    bootbox.prompt(data.cfg_var_binded_input_tip + '[' + data.cfg_var_binded_input + ']', function (result) {
                        // console.log(result);
                    });
                });
                break;
            case 3:
                // console.log('直接设置变量');
                var setVarFun = function () {};
                switch (data.cfg_var_binded_input_ctr) {
                    case 1:
                        setVarFun = function () {
                            var newVar = variable.getItem();
                            // console.log(newVar);
                            newVar[data.cfg_var_binded_input] = 0;
                            variable.setItem(newVar);
                        };
                        break;
                    case 2:
                        setVarFun = function () {
                            var newVar = variable.getItem();
                            // console.log(newVar);
                            newVar[data.cfg_var_binded_input] = 1;
                            variable.setItem(newVar);
                        };
                        break;
                    case 3:
                        setVarFun = function () {
                            var newVar = variable.getItem();
                            // console.log(newVar);
                            newVar[data.cfg_var_binded_input] = ((!!newVar[data.cfg_var_binded_input]) ? 0 : 1);
                            variable.setItem(newVar);
                        };
                        break;
                    case 4:
                        setVarFun = function () {
                            var newVar = variable.getItem();
                            newVar[data.cfg_var_binded_input] = data.cfg_var_binded_input_value;
                            variable.setItem(newVar);
                        };
                        break;
                    default:
                        // console.log('Sorry, we are out of ' + expr + '.');
                }
                $(dom).click(function () {
                    setVarFun();
                    // console.log(variable.getItem());
                });
                break;
            case 4:
                $(dom).click(function () {
                    window.location.href = data.cfg_jump_url;
                });
                break;
            default:
                // console.log('Sorry, we are out of ' + expr + '.');
        }

        // 获取dom上的data 属性 根据 data 属性修改数据
    },
    bindDragEvent: function (dom) {
        interact(dom)
            .draggable({
                onmove: function (event) {
                    var target = event.target;
                    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    var rotate = domUtil.getRotationDegrees($(target));
                    // translate the element
                    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                    target.style.webkitTransform = target.style.transform += 'rotate(' + rotate + 'deg)';

                    // update the posiion attributes
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                }
            })
            .resizable({
                preserveAspectRatio: false,
                edges: {
                    left: true,
                    right: true,
                    bottom: true,
                    top: true
                }
            })
            .on('resizemove', function (event) {
                var target = event.target;
                var x = (parseFloat(target.getAttribute('data-x')) || 0);
                var y = (parseFloat(target.getAttribute('data-y')) || 0);
                // update the element's style
                target.style.width = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';
                // translate when resizing from top or left edges
                x += event.deltaRect.left;
                y += event.deltaRect.top;
                var rotate = domUtil.getRotationDegrees($(target));
                target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)';
                target.style.webkitTransform = target.style.transform += 'rotate(' + rotate + 'deg)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
                // target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
            });
    },
    operatorList: operatorList,
    switchOperator: function (dom, setCallback) {
        var data = $(dom).data();
        var output = variable.getValueByVar(data.cfg_var_binded_ouput);
        var cfg_var_binded_ouput_deal = data.cfg_var_binded_ouput_deal;
        console.log(cfg_var_binded_ouput_deal);
        if (cfg_var_binded_ouput_deal) {
            cfg_var_binded_ouput_deal.forEach(function (element) {
                var initValue = element.initValue;
                switch (element.operator) {
                    case operatorList.equal:
                    debugger
                        if (output == initValue) {
                            setCallback(dom, element.callback);
                        }

                        break;
                    case operatorList.notEqual:
                        if (output != initValue) {
                            setCallback(dom, element.callback);
                        }

                        break;
                    case operatorList.greaterThan:

                        if (output > initValue) {
                            setCallback(dom, element.callback);
                        }

                        break;
                    case operatorList.greaterThanOrEqual:
                        if (output >= initValue) {
                            setCallback(dom, element.callback);
                        }

                        break;
                    case operatorList.lessThan:
                        if (output < initValue) {
                            setCallback(dom, element.callback);
                        }

                        break;
                    case operatorList.lessThanOrEqual:
                        if (output <= initValue) {
                            setCallback(dom, element.callback);
                        }

                        break;

                    default:
                        break;
                }
            }, this);
        }
    }
};