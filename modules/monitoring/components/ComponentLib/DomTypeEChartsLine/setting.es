var Base = require('modules/monitoring/Base.es');
var interact = require('modules/lib/interact/interact.js');
var domUtil = require('modules/util/dom/domUtil.es');
var commonAttrSet = require('modules/monitoring/components/ComponentLib/components/CommonAttr/commonAttrSet.es');
var store = require('modules/monitoring/dataService/store.es');


var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');
var api = require('modules/monitoring/dataService/api.es');
var defaultOption = {
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
};
module.exports = {
    type: Base.CONST_DOM_TYPE.DOMTYPE_ECHARTSLINE,
    name: '折线图',
    desc: '折线图',
    renderToCanvas: function() {
        var dom =
            `<div style=' min-width: 50px;
                    min-height: 50px;
                    text-align: center;
                    '
            class='u-drag'
            data-cfg_type="${this.type}"
            data-cfg-uuid="J_uuid_${Base.uuid()}">
                折线图
            </div>`;
        return dom;
    },
    bindDragEvent: function(uuid) {
        var dom = $('[data-cfg-uuid=' + uuid + ']')[0];
        baseSetting.bindDragEvent(uuid);
    },
    bindOpenSetEvent: function(uuid) {
        var dom = $('[data-cfg-uuid=' + uuid + ']')[0];
        var $dom = $(dom);
        $dom.dblclick(function() {
            var data = $(this).data();
            console.log(data)
                // 广播事件打开设置弹窗  传递过去数据
                // SHOW_UNIT_CONFIG 
            Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.SHOW_UNIT_CONFIG, [$dom, data]);
        });
    },

    runChart: function(uuid) {
        var dom = $('[data-cfg-uuid=' + uuid + ']')[0];
        var dataAttr = $(dom).data();
        console.log(dataAttr);
        var endTime = new Date().valueOf();
        var startTime = endTime - 500 * 60 * 1000; // 5 min
        startTime = 1506816000000;
        endTime = 1506816100000;
        var outputvar = dataAttr.cfg_var_binded_ouput;
        outputvar = '707d15bd-585a-4ea9-b60d-f8df593a63b1';
        (function(startTime, endTime, outputvar, uuid, defaultOption, dom) {
            api.GetAcquisitionVariableHistory({
                startTime: startTime,
                endTime: endTime,
                vEquipmentVariableId: outputvar
            }).then(function(res) {
                // 指定图表的配置项和数据
                var option = $.extend({}, defaultOption);
                if (!window[uuid]) {
                    $(dom).html('');
                    window[uuid] = echarts.init(dom);
                    window[uuid].setOption(option);
                }
                window[uuid].showLoading();
                window[uuid].setOption({
                    xAxis: [{
                        data: res.Data.vTimes || []
                    }],
                    series: [{
                        data: [40, 10, 20, 50, 20, 50, 20, 50, 20, 50] //res.Data.vValues || []
                    }]
                });
                // 使用刚指定的配置项和数据显示图表。
                window[uuid].hideLoading();
                window[uuid].resize();
            })
        })(startTime, endTime, outputvar, uuid, defaultOption, dom)
    },
    monitorCallBack: function(dom) {
        var self = this;
        baseSetting.monitorCallBack(dom);

        function justBindVar(dom) {
            var data = $(dom).data();
            var uuid = data['cfgUuid'];
            self.runChart(uuid);
        }

        function setCallback(dom, callback) {
            var object = {};
            // 行转列
            callback.forEach(function(element) {
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
        Base.eventEmitter.addListener(Base.CONST_EVENT_NAME.TRIGGER_REFRESH_MONITOR, function() {
            justBindVar(dom);
            baseSetting.switchOperator(dom, setCallback);
        });

    }
};