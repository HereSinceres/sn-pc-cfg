var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var variable = require('modules/monitoring/dataService/variable.es');
 
var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');
 
module.exports = {
    props: ['$dom', 'data'],
    components: { 
        CommonStyle: require('modules/monitoring/components/ComponentLib/components/CommonStyle/index.es') ,
        CommonAttr: require('modules/monitoring/components/ComponentLib/components/CommonAttr/index.es') ,
    },
    data: function () {
        return { 
            // 绑定的变量
            variable: variable.getItem(), 
            cfg_var_binded_ouput: null,
            fontSize: null,
            color: null,
            operatorList: baseSetting.operatorList,
            cfg_var_binded_ouput_deal: []
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        var target = this.$dom[0];
        this.cfg_var_binded_ouput = this.$dom.attr('data-cfg_var_binded_ouput');
        this.fontSize = target.style.fontSize;
        this.color = target.style.color;
        this.cfg_var_binded_ouput_deal = JSON.parse(this.$dom.attr('data-cfg_var_binded_ouput_deal') || []);
    },
    methods: {
        ok:function(){
            var target = this.$dom[0];
            this.$dom.attr('data-cfg_var_binded_ouput', this.cfg_var_binded_ouput); 
            target.style.fontSize = this.fontSize;
            target.style.color = this.color;
            // 结果处理
            this.$dom.attr('data-cfg_var_binded_ouput_deal', JSON.stringify(this.cfg_var_binded_ouput_deal));
            $.notify({
                message: '保存成功'
            });
        },
        addOperate: function () {
            this.cfg_var_binded_ouput_deal.push({
                initValue: 1,
                operator: '<=',
                callback: [{
                        name: '字体大小',
                        attr: 'fontSize',
                        value: ''
                    },
                    {
                        name: '颜色',
                        attr: 'color',
                        value: ''
                    }
                ]
            });
        },
        removeOperate: function (item) {
            let index = this.cfg_var_binded_ouput_deal.indexOf(item)
            this.cfg_var_binded_ouput_deal.splice(index, 1);
        }
    }
};
