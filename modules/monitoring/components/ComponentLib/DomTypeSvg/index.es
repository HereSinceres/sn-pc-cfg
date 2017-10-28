var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');


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
            variable: store.variable,
            cfg_var_binded_ouput: null,
            svgPath: null,
            isShowOutPutDialog: false
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        var $dom = $($('[data-cfg-uuid=' + this.uuid + ']')[0]);
        this.cfg_var_binded_ouput = $dom.attr('data-cfg_var_binded_ouput');
        this.svgPath = $dom.html();
    },
    methods: {
        ok: function () {
            var self = this;
            var $dom = $($('[data-cfg-uuid=' + this.uuid + ']')[0]);
            $dom.attr('data-cfg_var_binded_ouput', this.cfg_var_binded_ouput);
            $dom.html(this.svgPath);
            this.toggleOutPut(0);
            var dataAttr = $dom.data();
            comlib.forEach(function (element) {
                if (dataAttr.cfg_type === element.type) {
                    element.runSvg(self.uuid);
                }
            }, this);
        },
        toggleOutPut: function (isShow) {
            this.isShowOutPutDialog = isShow;
        }
    }
};

 