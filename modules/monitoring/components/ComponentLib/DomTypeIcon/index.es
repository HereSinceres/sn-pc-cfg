var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');

var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');

var store = require('modules/monitoring/dataService/store.es');
var iconList = [{
        iconName: 'fa fa-bath',
        name: 'bath'
    },
    {
        iconName: 'fa fa-lightbulb-o',
        name: 'lightbulb'
    }
];

module.exports = {
    props: ['$dom', 'data'],
    components: {
        CommonStyle: require('modules/monitoring/components/ComponentLib/components/CommonStyle/index.es'),
        CommonAttr: require('modules/monitoring/components/ComponentLib/components/CommonAttr/index.es')
    },
    data: function () {
        return {
            // 绑定的变量
            variable:store.variable,
            cfg_var_binded_ouput: null,
            iconList: iconList,
            icon: null,
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
        this.icon = this.$dom.find('span').attr('class');
        this.fontSize = target.style.fontSize;
        this.color = target.style.color;
        try {
            this.cfg_var_binded_ouput_deal = JSON.parse(this.$dom.attr('data-cfg_var_binded_ouput_deal') || []);
        } catch (error) {}
    },
    methods: {
        ok: function () {
            var target = this.$dom[0];
            this.$dom.attr('data-cfg_var_binded_ouput', this.cfg_var_binded_ouput);
            this.$dom.find('span').attr('class', this.icon);
            target.style.fontSize = this.fontSize;
            target.style.color = this.color;
            // 结果处理
            this.$dom.attr('data-cfg_var_binded_ouput_deal', JSON.stringify(this.cfg_var_binded_ouput_deal));
            $.notify({
                message: '保存成功'
            });
        },
        setIcon: function (item) {
            this.icon = item.iconName;
        },
        addOperate: function () {
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
        removeOperate: function (item) {
            let index = this.cfg_var_binded_ouput_deal.indexOf(item);
            this.cfg_var_binded_ouput_deal.splice(index, 1);
        }
    }
};