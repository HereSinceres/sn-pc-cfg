var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');


var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');

var store = require('modules/monitoring/dataService/store.es');
module.exports = {
    props: ['uuid'],
    components: {
        CommonStyle: require('modules/monitoring/components/ComponentLib/com/CommonStyle/index.es'),
        CommonAttr: require('modules/monitoring/components/ComponentLib/com/CommonAttr/index.es'),
    },
    data: function () {
        return {
            // 绑定的变量
            variable: store.variable,
            cfg_var_binded_ouput: null,
            fontSize: null,
            color: null,
            operatorList: baseSetting.operatorList,
            cfg_var_binded_ouput_deal: [],
            isShowOutPutDialog: false,
            isShowPrivateAttrDialog: false,
            prefix: null,
            suffix: null
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        var $dom = $($('[data-cfg-uuid=' + this.uuid + ']')[0]);
        var target = $('[data-cfg-uuid=' + this.uuid + ']')[0];
        this.cfg_var_binded_ouput = $dom.attr('data-cfg_var_binded_ouput');
        this.prefix = $dom.attr('data-prefix');
        this.suffix = $dom.attr('data-suffix');
        this.fontSize = target.style.fontSize;
        this.color = target.style.color;
        try {
            this.cfg_var_binded_ouput_deal = JSON.parse($dom.attr('data-cfg_var_binded_ouput_deal') || '[]');
        } catch (error) {

        }
    },
    methods: {
        ok: function () {
            var $dom = $($('[data-cfg-uuid=' + this.uuid + ']')[0]);
            var target = $('[data-cfg-uuid=' + this.uuid + ']')[0];
            $dom.attr('data-cfg_var_binded_ouput', this.cfg_var_binded_ouput);
            $dom.attr('data-prefix', this.prefix);
            $dom.attr('data-suffix', this.suffix);
            target.style.fontSize = this.fontSize;
            target.style.color = this.color;
            // 结果处理
            $dom.attr('data-cfg_var_binded_ouput_deal', JSON.stringify(this.cfg_var_binded_ouput_deal));
            $.notify({
                message: '保存成功'
            });
            this.toggleOutPut(0);
            this.togglePrivateAttr(0);
        },
        addOperate: function () {
            this.cfg_var_binded_ouput_deal.push({
                initValue: 1,
                operator: '<=',
                callback: [
                    {
                        name: '颜色[eg:red]',
                        attr: 'color',
                        value: ''
                    }, {
                        name: '修改文本（12如果为dfs空默认为变量值)',
                        attr: 'text',
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
        togglePrivateAttr: function (isShow) {
            this.isShowPrivateAttrDialog = isShow;
        }
    }
};