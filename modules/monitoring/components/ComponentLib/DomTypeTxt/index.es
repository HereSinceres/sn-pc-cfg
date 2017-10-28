var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');


var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');

var store = require('modules/monitoring/dataService/store.es');
module.exports = {
    props: ['uuid'],
    components: {
        CommonStyle: require('modules/monitoring/components/ComponentLib/components/CommonStyle/index.es'),
        CommonAttr: require('modules/monitoring/components/ComponentLib/components/CommonAttr/index.es'),
    },
    data: function() {
        return {
            // 绑定的变量
            variable: store.variable,
            cfg_var_binded_ouput: null,
            fontSize: null,
            color: null,
            operatorList: baseSetting.operatorList,
            cfg_var_binded_ouput_deal: [],
            isShowOutPutDialog: false
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function() {
        var $dom = $($('[data-cfg-uuid=' + this.uuid + ']')[0]);
        var target = $('[data-cfg-uuid=' + this.uuid + ']')[0];
        this.cfg_var_binded_ouput = $dom.attr('data-cfg_var_binded_ouput');
        this.fontSize = target.style.fontSize;
        this.color = target.style.color;
        try {
            this.cfg_var_binded_ouput_deal = JSON.parse($dom.attr('data-cfg_var_binded_ouput_deal') || '[]');
        } catch (error) {

        }
    },
    methods: {
        ok: function() {
            var $dom = $($('[data-cfg-uuid=' + this.uuid + ']')[0]);
            var target = $('[data-cfg-uuid=' + this.uuid + ']')[0];
            $dom.attr('data-cfg_var_binded_ouput', this.cfg_var_binded_ouput);
            target.style.fontSize = this.fontSize;
            target.style.color = this.color;
            // 结果处理
            $dom.attr('data-cfg_var_binded_ouput_deal', JSON.stringify(this.cfg_var_binded_ouput_deal));
            $.notify({
                message: '保存成功'
            });
            this.toggleOutPut(0);
        },
        addOperate: function() {
            this.cfg_var_binded_ouput_deal.push({
                initValue: 1,
                operator: '<=',
                callback: [{
                        name: '字体大小[eg:12px]',
                        attr: 'fontSize',
                        value: ''
                    },
                    {
                        name: '颜色[eg:red]',
                        attr: 'color',
                        value: ''
                    }
                ]
            });
        },
        removeOperate: function(item) {
            let index = this.cfg_var_binded_ouput_deal.indexOf(item)
            this.cfg_var_binded_ouput_deal.splice(index, 1);
        },
        toggleOutPut: function(isShow) {
            this.isShowOutPutDialog = isShow;
        }
    }
};