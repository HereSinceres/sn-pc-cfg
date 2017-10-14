var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var variable = require('modules/monitoring/dataService/variable.es');
 console.log( variable.getItem());
 
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
            cfg_var_binded_ouput: null
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        this.cfg_var_binded_ouput = this.$dom.attr('data-cfg_var_binded_ouput');
        
    },
    methods: {
        ok:function(){
            this.$dom.attr('data-cfg_var_binded_ouput', this.cfg_var_binded_ouput);
            
        }
    }
};
