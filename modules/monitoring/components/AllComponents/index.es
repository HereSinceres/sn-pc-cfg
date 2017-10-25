var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var Base = require('modules/monitoring/Base.es');
module.exports = {
    components: {},
    data: function() {
        return {
            comlib: comlib
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function() {

    },
    methods: {
        addToPaint: function(item) {
            Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.ADD_NEWUNIT, [item]);
        }
    }
};