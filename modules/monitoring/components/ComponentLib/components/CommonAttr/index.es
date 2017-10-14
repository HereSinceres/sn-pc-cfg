var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var variable = require('modules/monitoring/dataService/variable.es');
var commonAttrSet = require('modules/monitoring/components/ComponentLib/components/CommonAttr/commonAttrSet.es');

module.exports = {
    props: ['$dom', 'data'],
    components: {},
    data: function () {
        return {
            cfg_attr_input: null,
            inputAttrList: commonAttrSet.inputAttrList,
            // 绑定的变量
            variable: variable.getItem(),
            cfg_var_binded_input: null,
            cfg_var_binded_input_tip: null, // 弹窗提示语
            cfg_var_binded_input_ctr: null, // (输入操作)
            inputCtrList: commonAttrSet.inputCtrList,
            cfg_jump_url: null, // 跳转链接
            cfg_var_binded_input_value: null // 赋予值
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        this.cfg_attr_input = this.$dom.attr('data-cfg_attr_input');
        this.cfg_var_binded_input = this.$dom.attr('data-cfg_var_binded_input');
        this.cfg_var_binded_input_tip = this.$dom.attr('data-cfg_var_binded_input_tip');
        this.cfg_var_binded_input_ctr = this.$dom.attr('data-cfg_var_binded_input_ctr');
        this.cfg_jump_url = this.$dom.attr('data-cfg_jump_url');
        this.cfg_var_binded_input_value = this.$dom.attr('data-cfg_var_binded_input_value');
    },
    methods: {
        ok: function () {
            this.$dom.attr('data-cfg_attr_input', this.cfg_attr_input);
            this.$dom.attr('data-cfg_var_binded_input', this.cfg_var_binded_input);
            this.$dom.attr('data-cfg_var_binded_input_tip', this.cfg_var_binded_input_tip);
            this.$dom.attr('data-cfg_var_binded_input_ctr', this.cfg_var_binded_input_ctr);
            this.$dom.attr('data-cfg_jump_url', this.cfg_jump_url);
            this.$dom.attr('data-cfg_var_binded_input_value', this.cfg_var_binded_input_value);
            $.notify({
                message: '保存成功'
            });
        }
    }
};
