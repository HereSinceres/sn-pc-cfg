var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var domUtil = require('modules/util/dom/domUtil.es');


var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');


var store = require('modules/monitoring/dataService/store.es');
module.exports = {
    props: ['uuid'],
    components: {
        CommonStyle: require('modules/monitoring/components/ComponentLib/com/CommonStyle/index.es'),
        CommonAttr: require('modules/monitoring/components/ComponentLib/com/CommonAttr/index.es')
    },
    data: function () {
        return {
         
            // 绑定的变量  
            variable: store.variable,
            cfg_var_binded_ouput: null,
            svgPath: null,
            isShowPathDialog: false,
            operatorList: baseSetting.operatorList,
            cfg_var_binded_ouput_deal: [],
            isShowOutPutDialog: false,
            style: [
                {
                    name: '线条',
                    attr: 'stroke',
                    value: ''
                }, {
                    name: '宽度',
                    attr: 'strokeWidth',
                    value: ''
                }, {
                    name: '虚线',
                    attr: 'strokeDasharray',
                    value: ''
                }
            ]
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        var $dom = $($('[data-cfg-uuid=' + this.uuid + ']')[0]);
        this.cfg_var_binded_ouput = $dom.attr('data-cfg_var_binded_ouput');
        this.svgPath = $dom.html();
        var target = $dom[0];
        var array = this.style;
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            element.value = target.style[element.attr];
        }
        try {
            this.cfg_var_binded_ouput_deal = JSON.parse($dom.attr('data-cfg_var_binded_ouput_deal') || '[]');
        } catch (error) {

        }
    },
    methods: {
        ok: function () {
            var self = this;
            var $dom = $($('[data-cfg-uuid=' + this.uuid + ']')[0]);
            var target = $dom[0];

            $dom.attr('data-cfg_var_binded_ouput', this.cfg_var_binded_ouput);
            $dom.html(this.svgPath);

            var array = this.style;
            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                target.style[element.attr] = element.value;
            }
            // 结果处理
            $dom.attr('data-cfg_var_binded_ouput_deal', JSON.stringify(this.cfg_var_binded_ouput_deal));
            $.notify({
                message: '保存成功'
            });
            this.togglePath(0);
            this.toggleOutPut(0);
        },
        togglePath: function (isShow) {
            this.isShowPathDialog = isShow;
        },
        addOperate: function () {
            this.cfg_var_binded_ouput_deal.push({
                initValue: 1,
                operator: '<=',
                callback: [
                    {
                        name: '线条',
                        attr: 'stroke',
                        value: ''
                    } 
                ]
            });
        },
        removeOperate: function (item) {
            let index = this.cfg_var_binded_ouput_deal.indexOf(item)
            this.cfg_var_binded_ouput_deal.splice(index, 1);
        },
        toggleOutPut: function (isShow) {
            this.isShowOutPutDialog = isShow;
        },
    }
};

