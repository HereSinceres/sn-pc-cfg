var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var domUtil = require('modules/util/dom/domUtil.es');
module.exports = {
    components: {
        DomTypeTxt: require('modules/monitoring/components/ComponentLib/DomTypeTxt/index.es'),
        DomTypeLine: require('modules/monitoring/components/ComponentLib/DomTypeLine/index.es'),
        DomTypeSimpleShape: require('modules/monitoring/components/ComponentLib/DomTypeSimpleShape/index.es'), 
        DomTypeSvg: require('modules/monitoring/components/ComponentLib/DomTypeSvg/index.es'), 
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
        var timer;

        function callBack(uuid) {
            clearTimeout(timer);
            timer = setTimeout(function() {
                self.data = null;
                self.uuid = null;
                timer = setTimeout(function() {
                    var dom = domUtil.getDomByuuid(uuid);
                    self.data = $(dom).data();
                    self.uuid = uuid;
                }, 200);
            }, 200);
        }
        Base.eventEmitter.addListener(Base.CONST_EVENT_NAME.SHOW_UNIT_CONFIG, callBack);
    },
    methods: {

    }
};


