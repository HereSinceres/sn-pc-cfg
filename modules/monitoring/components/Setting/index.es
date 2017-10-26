var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
module.exports = {
    components: {
        DomTypeTxt: require('modules/monitoring/components/ComponentLib/DomTypeTxt/index.es'),
        DomTypeLine: require('modules/monitoring/components/ComponentLib/DomTypeLine/index.es'),
        DomTypeRect: require('modules/monitoring/components/ComponentLib/DomTypeRect/index.es'),
        DomTypeCircle: require('modules/monitoring/components/ComponentLib/DomTypeCircle/index.es'),
        DomTypeSvg: require('modules/monitoring/components/ComponentLib/DomTypeSvg/index.es'),
        DomTypeEllipse: require('modules/monitoring/components/ComponentLib/DomTypeEllipse/index.es'),
        DomTypeIcon: require('modules/monitoring/components/ComponentLib/DomTypeIcon/index.es'),
        DomTypeImage: require('modules/monitoring/components/ComponentLib/DomTypeImage/index.es'),
        DomTypeEChartsGauge: require('modules/monitoring/components/ComponentLib/DomTypeEChartsGauge/index.es'),
        DomTypeEChartsLine: require('modules/monitoring/components/ComponentLib/DomTypeEChartsLine/index.es')
    },
    data: function() {
        return {
            data: null,
            uuid: null
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function() {
        var self = this;

        function callBack(uuid) {
            self.data = null;
            self.uuid = null;
            setTimeout(function() {
                var dom = $('[data-cfg-uuid=' + uuid + ']')[0];
                self.data = $(dom).data();
                self.uuid = uuid;
            }, 200);
        }
        Base.eventEmitter.addListener(Base.CONST_EVENT_NAME.SHOW_UNIT_CONFIG, callBack);
    },
    methods: {

    }
};