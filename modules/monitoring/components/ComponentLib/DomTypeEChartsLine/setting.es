var Base = require('modules/monitoring/Base.es');
var interact = require('modules/lib/interact/interact.js');
var domUtil = require('modules/util/dom/domUtil.es');
var commonAttrSet = require('modules/monitoring/components/ComponentLib/components/CommonAttr/commonAttrSet.es');
var store = require('modules/monitoring/dataService/store.es');


var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');
var api = require('modules/monitoring/dataService/api.es');

module.exports = {
    type: Base.CONST_DOM_TYPE.DOMTYPE_ECHARTSLINE,
    name: '折线图',
    desc: '折线图',
    renderToCanvas: function () {
        var dom = `<div 
            class='u-drag'
            data-cfg_type="${this.type}"
            data-cfg-uuid="J_uuid_${Base.uuid()}">
                折线图
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
            console.log(data)
            // 广播事件打开设置弹窗  传递过去数据
            // SHOW_UNIT_CONFIG 
            Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.SHOW_UNIT_CONFIG, [$dom, data]);
        });
    },
    runChart: function (dom) {
        var dataAttr = $(dom).data();
        var output = store.getValueByVar(dataAttr.cfg_var_binded_ouput);
        var endTime = new Date().valueOf();
        var startTime = endTime - 5 * 60 * 1000;// 5 min
        api.GetAcquisitionVariableHistory({
            startTime: startTime,
            endTime: endTime,
            vEquipmentVariableId: dataAttr.cfg_var_binded_ouput
        }).then(function (res) {
            console.log(res);
        })

        if (!window[dataAttr.cfgUuid]) {
            window[dataAttr.cfgUuid] = echarts.init(dom);
        }
        window[dataAttr.cfgUuid].showLoading();


        function randomData() {
            now = new Date(+now + oneDay);
            value = value + Math.random() * 21 - 10;
            return {
                name: now.toString(),
                value: [
                    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                    Math.round(value)
                ]
            }
        }


        var data = [];
        var now = +new Date(1997, 9, 3);
        var oneDay = 24 * 3600 * 1000;
        var value = Math.random() * 1000;
        for (var i = 0; i < 1000; i++) {
            data.push(randomData());
        }

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '时间坐标轴'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0];
                    var date = new Date(params.name);
                    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        window[dataAttr.cfgUuid].hideLoading();
        window[dataAttr.cfgUuid].setOption(option);
        window[dataAttr.cfgUuid].resize();
    },
    monitorCallBack: function (dom) {
        var self = this;
        baseSetting.monitorCallBack(dom);
        function justBindVar(dom) {
            console.log(dom);
            self.runChart(dom);
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
            baseSetting.switchOperator(dom, setCallback);
        });

    }
};