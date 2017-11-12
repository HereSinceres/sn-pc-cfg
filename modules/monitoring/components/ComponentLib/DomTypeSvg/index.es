var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var domUtil = require('modules/util/dom/domUtil.es');


var store = require('modules/monitoring/dataService/store.es');
module.exports = {
    props: ['uuid'],
    components: {
        CommonStyle: require('modules/monitoring/components/ComponentLib/com/CommonStyle/index.es'),
        CommonAttr: require('modules/monitoring/components/ComponentLib/com/CommonAttr/index.es')
    },
    data: function () {
        return {
            // 绑定的变量
            variable: store.variable,
            svgPath: null,
            isShowPathDialog: false,
            style: [
                {
                    name: '线条',
                    attr: 'stroke',
                    value: ''
                }, {
                    name: '宽度',
                    attr: 'strokeWidth',
                    value: ''
                }]
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        var $dom = $($('[data-cfg-uuid=' + this.uuid + ']')[0]);
        this.svgPath = $dom.html();
        var target = $dom[0];
        var array = this.style;
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            element.value = target.style[element.attr];
        }
    },
    methods: {
        ok: function () {
            var self = this;
            var $dom = $($('[data-cfg-uuid=' + this.uuid + ']')[0]);
            var target = $dom[0];

            $dom.html(this.svgPath);

            var array = this.style;
            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                target.style[element.attr] = element.value;
            }

            this.togglePath(0);
        },
        togglePath: function (isShow) {
            this.isShowPathDialog = isShow;
        }
    }
};

