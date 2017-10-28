var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');

var commonAttrSet = require('modules/monitoring/components/ComponentLib/components/CommonAttr/commonAttrSet.es');

var store = require('modules/monitoring/dataService/store.es');
module.exports = {
    props: ['uuid'],
    components: {},
    data: function () {
        return {
            cfg_attr_input: null,
            inputAttrList: commonAttrSet.inputAttrList,
            // 绑定的变量
            variable: store.variable,
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
        var $dom = $($('[data-cfg-uuid=' + this.uuid + ']')[0]);
        this.cfg_attr_input = $dom.attr('data-cfg_attr_input');
        this.cfg_var_binded_input = $dom.attr('data-cfg_var_binded_input');
        this.cfg_var_binded_input_tip = $dom.attr('data-cfg_var_binded_input_tip');
        this.cfg_var_binded_input_ctr = $dom.attr('data-cfg_var_binded_input_ctr');
        this.cfg_jump_url = $dom.attr('data-cfg_jump_url');
        this.cfg_var_binded_input_value = $dom.attr('data-cfg_var_binded_input_value');
    },
    methods: {
        ok: function () {
            var self = this;
            var $dom = $($('[data-cfg-uuid=' + this.uuid + ']')[0]);
            $dom.attr('data-cfg_attr_input', this.cfg_attr_input);
            $dom.attr('data-cfg_var_binded_input', this.cfg_var_binded_input);
            $dom.attr('data-cfg_var_binded_input_tip', this.cfg_var_binded_input_tip);
            $dom.attr('data-cfg_var_binded_input_ctr', this.cfg_var_binded_input_ctr);
            $dom.attr('data-cfg_jump_url', this.cfg_jump_url);
            $dom.attr('data-cfg_var_binded_input_value', this.cfg_var_binded_input_value);
            $.notify({
                message: '保存成功'
            });
            var data = $dom.data();
            comlib.forEach(function (element) {
                if (data.cfg_type === element.type) {
                    // 初始化monitorCallBack
                    if (element.monitorCallBack) {
                        element.monitorCallBack(self.uuid);
                    }
                }
            }, this);
        }
    }
};