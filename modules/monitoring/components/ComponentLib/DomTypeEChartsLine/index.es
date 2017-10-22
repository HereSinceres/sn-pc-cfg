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
            variable: store.variable,
            cfg_var_binded_ouput: null,
            operatorList: baseSetting.operatorList
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        var target = this.$dom[0];
        this.cfg_var_binded_ouput = this.$dom.attr('data-cfg_var_binded_ouput');
    },
    methods: {
        ok: function () {
            var target = this.$dom[0];
            
            var dataAttr = $(target).data();
            this.$dom.attr('data-cfg_var_binded_ouput', this.cfg_var_binded_ouput);
        
            comlib.forEach(function (element) {
                if (dataAttr.cfg_type === element.type) {
                    element.runChart(target);
                }
            }, this);
            $.notify({
                message: '保存成功'
            });
        }
    }
};