var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');

var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');

var store = require('modules/monitoring/dataService/store.es');
 
module.exports = {
    props: ['uuid'],
    components: {
        CommonStyle: require('modules/monitoring/components/ComponentLib/components/CommonStyle/index.es'),
        CommonAttr: require('modules/monitoring/components/ComponentLib/components/CommonAttr/index.es')
    },
    data: function () {
        return {
            // 绑定的变量
            variable: store.variable.filter(function (ele) {
                return true;
            }),
            cfg_var_binded_ouput: null,
            cfg_chart_option: baseSetting.defaultChartGaugeOption,
            isShowOutPutDialog: false,
            isShowOptionCfgDialog: false
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        var $dom = $($('[data-cfg-uuid=' + this.uuid + ']')[0]);
        var target = $('[data-cfg-uuid=' + this.uuid + ']')[0];
        this.cfg_var_binded_ouput = $dom.attr('data-cfg_var_binded_ouput');
        try {
            if ($dom.attr('data-cfg_chart_option')) {
                this.cfg_chart_option = JSON.parse($dom.attr('data-cfg_chart_option'));
            }
        } catch (error) {
        }
    },
    methods: {
        ok: function () {
            var $dom = $($('[data-cfg-uuid=' + this.uuid + ']')[0]);
            var target = $('[data-cfg-uuid=' + this.uuid + ']')[0];
            var self = this;
            var dataAttr = $(target).data();
            $dom.attr('data-cfg_var_binded_ouput', this.cfg_var_binded_ouput);
            // chart option 配置
            $dom.attr('data-cfg_chart_option', JSON.stringify(this.cfg_chart_option));
            comlib.forEach(function (element) {
                if (dataAttr.cfg_type === element.type) {
                    element.runChart(self.uuid);
                }
            }, this);
            $.notify({
                message: '保存成功'
            });
            this.toggleOutPut(0);
            this.toggleOptionCfg(0);
        },
        toggleOutPut: function (isShow) {
            this.isShowOutPutDialog = isShow;
        },
        toggleOptionCfg: function (isShow) {
            this.isShowOptionCfgDialog = isShow;
        }
    }
};