var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var Base = require('modules/monitoring/Base.es');
module.exports = {
    components: {},
    data: function() {
        return {
            comlib: null,
            searchtxt: ''
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function() {
        this.comlib = comlib.map(function(ele) {
            ele.isActive = false;
            return ele;
        });
        console.log(this.comlib);
    },
    methods: {
        addToPaint: function(item) {
            Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.ADD_NEWUNIT, [item]);
        },
        search: function() {
            var self = this;
            this.comlib = comlib.map(function(ele) {
                if (ele.desc.indexOf(self.searchtxt) > -1 || ele.name.indexOf(self.searchtxt) > -1) {
                    ele.isActive = true;
                } else {
                    ele.isActive = false;
                }
                return ele;
            })

        }
    }
};