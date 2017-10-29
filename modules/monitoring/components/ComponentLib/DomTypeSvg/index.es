var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var domUtil = require('modules/util/dom/domUtil.es');


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
            svgPath: null,
            isShowPathDialog: false
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        var $dom = $($('[data-cfg-uuid=' + this.uuid + ']')[0]);
        this.svgPath = $dom.html();
    },
    methods: {
        ok: function () {
            var self = this;
            var $dom = $($('[data-cfg-uuid=' + this.uuid + ']')[0]);
            $dom.html(this.svgPath);
            var attrs = domUtil.getAttributes($dom);
            comlib.forEach(function (element) {
                if (attrs['data-cfg_type'] === element.type) {
                    element.runSvg(self.uuid);
                }
            }, this);
            this.togglePath(0);
        },
        togglePath: function (isShow) {
            this.isShowPathDialog = isShow;
        }
    }
};

