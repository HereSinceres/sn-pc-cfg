var Base = require('modules/monitoring/Base.es');
var interact = require('modules/lib/interact/interact.js');
var domUtil = require('modules/util/dom/domUtil.es');
var commonAttrSet = require('modules/monitoring/components/ComponentLib/components/CommonAttr/commonAttrSet.es');
var store = require('modules/monitoring/dataService/store.es');


var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');

module.exports = {
    type: Base.CONST_DOM_TYPE.DOMTYPE_ECHARTSGAUGE,
    icon: 'fa fa-tachometer',
    name: '仪表盘',
    desc: '仪表盘',
    renderToCanvas: function() {
        var dom = `<div style=' min-width: 50px;
                                min-height: 50px;
                                text-align: center;
                                '
            class='u-drag'
            data-cfg_type="${this.type}"
            data-cfg-uuid="J_uuid_${Base.uuid()}">
               仪表盘
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
        var output = store.getValueByVar(dataAttr.cfg_var_binded_ouput);
        if (!window[uuid]) {
            $(dom).html('');
            window[uuid] = echarts.init(dom);
        }
        window[uuid].showLoading();
        // 指定图表的配置项和数据
        var option = {
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [{
                type: 'gauge',
                min: 0,
                max: 220,
                detail: { formatter: '{value}' },
                data: [{ value: output, name: '完成率' }]
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        window[uuid].hideLoading();
        window[uuid].setOption(option);
        window[uuid].resize();
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