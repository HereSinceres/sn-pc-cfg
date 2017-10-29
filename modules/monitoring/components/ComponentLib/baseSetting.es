var Base = require('modules/monitoring/Base.es');
var interact = require('modules/lib/interact/interact.js');
var domUtil = require('modules/util/dom/domUtil.es');
var commonAttrSet = require('modules/monitoring/components/ComponentLib/components/CommonAttr/commonAttrSet.es');
var api = require('modules/monitoring/dataService/api.es');

var store = require('modules/monitoring/dataService/store.es');

var operatorList = {
    equal: '==',
    notEqual: '!=',
    greaterThan: '>',
    greaterThanOrEqual: '>=',
    lessThan: '<',
    lessThanOrEqual: '<='
};

function moveTarget(target, dx, dy) {
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + dy;

    var rotate = domUtil.getRotationDegrees($(target));
    // translate the element
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    target.style.webkitTransform = target.style.transform += 'rotate(' + rotate + 'deg)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    var data = $(target).data();
    var uuid = data.cfgUuid;
    Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.SHOW_UNIT_CONFIG, [uuid]);
}
module.exports = {
    getDomUuid: function () {
        return 'J_uuid_' + Base.uuid() + '';
    },
    monitorCallBack: function (uuid) {
        var dom = domUtil.getDomByuuid(uuid);
        function setValByValId(eVariableId, newValue) {
            api.setValByValId({
                eVariableId: eVariableId,
                newValue: newValue
            }).then(function (res) {
                if (res.success) {
                    $.notify({
                        message:'修改成功'
                    });
                }else{
                    $.notify({
                        message:'修改失败'
                    });
                }
            });
        }
        var attrs = domUtil.getAttributes($(dom));
        // console.log('直接设置变量');
        var setVarFun = function () { };
        switch (parseInt(attrs['data-cfg_attr_input'], 10)) {
            case 1:
                // console.log('什么都不做');
                break;
            case 2:
                setVarFun = function () {
                    // + '[' + attrs['data-cfg_var_binded_input'] + ']'
                    bootbox.prompt(attrs['data-cfg_var_binded_input_tip'], function (result) {
                        if (result !== null) {
                            setValByValId(attrs['data-cfg_var_binded_input'], result);
                        }

                    });
                };
                break;
            case 3:
                switch (parseInt(attrs['data-cfg_var_binded_input_ctr'], 10)) {
                    // 置0
                    case 1:
                        setVarFun = function () {

                            setValByValId(attrs['data-cfg_var_binded_input'], 0);

                        };
                        break;
                    // 置1
                    case 2:
                        setVarFun = function () {

                            setValByValId(attrs['data-cfg_var_binded_input'], 1);
                        };
                        break;
                    // 去反
                    case 3:
                        setVarFun = function () {
                            var newVar = store.variable;
                            var result = ((!!newVar[attrs['data-cfg_var_binded_input']]) ? 0 : 1);

                            setValByValId(attrs['data-cfg_var_binded_input'], 0);
                        };
                        break;
                    case 4:
                        setVarFun = function () {
                            var result = attrs['data-cfg_var_binded_input_value'];
                            setValByValId(attrs['data-cfg_var_binded_input'], 0);
                        };
                        break;
                    default:
                    // console.log('Sorry, we are out of ' + expr + '.');
                }

                break;
            case 4:
                setVarFun = function () {
                    window.location.href = attrs['data-cfg_jump_url'];
                };
                break;
            default:
            // console.log('Sorry, we are out of ' + expr + '.');
        }
        $(dom).off('click');
        $(dom).click(function () {
            if (window.__isDebuggerFireToOnline__) {
                return;
            }

            setVarFun();
        });

        // 获取dom上的data 属性 根据 data 属性修改数据
    },
    moveTarget: moveTarget,
    bindDragEvent: function (uuid) {
        var dom = domUtil.getDomByuuid(uuid);
        var attrs = domUtil.getAttributes($(dom));
        interact(dom)
            .draggable({
                onmove: function (event) {
                    var dx = event.dx;
                    var dy = event.dy;

                    if (window.__select_ele__.length) {
                        window.__select_ele__.forEach(function (target) {
                            target = target[0];
                            moveTarget(target, dx, dy);
                        }, this);
                    }
                    else {
                        var target = event.target;
                        moveTarget(target, dx, dy);
                    }
                    console.log(1);
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
                // 处理图表resize
                if (window[uuid]) {
                    window[uuid].resize();
                }

            });
    },
    operatorList: operatorList,
    switchOperator: function (uuid, setCallback) {

        var dom = domUtil.getDomByuuid(uuid);
        var attrs = domUtil.getAttributes($(dom));
        var output = store.getValueByVar(attrs['data-cfg_var_binded_ouput']);
        if (attrs['data-cfg_var_binded_ouput_deal']) {
            var cfg_var_binded_ouput_deal = JSON.parse(attrs['data-cfg_var_binded_ouput_deal']);
            if (cfg_var_binded_ouput_deal) {
                for (var index = 0; index < cfg_var_binded_ouput_deal.length; index++) {
                    var element = cfg_var_binded_ouput_deal[index];
                    var initValue = element.initValue;
                    switch (element.operator) {
                        case operatorList.equal:
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
                }
            }
        }

    },
    defaultChartGaugeOption: {
        backgroundColor: 'rgba(234,32,23,0.2)',
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
        series: [{
            type: 'gauge',
            min: 0,
            max: 220,
            detail: {
                formatter: '{value}'
            },
            data: [{ value: null, name: '修改title' }]
        }]
    },
    defaultChartLineOption: {
        backgroundColor: 'rgba(234,32,23,0.2)',
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: 0,
            right: 0,
            bottom: 0
        },
        xAxis: [{
            show: false,
            type: 'category',
            data: []
        }],
        yAxis: [{
            show: false,
            type: 'value'
        }],
        series: [{
            showSymbol: false,
            type: 'line',
            data: []
        }]
    }
};
