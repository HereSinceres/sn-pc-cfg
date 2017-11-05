var allComList = require('modules/monitoring/components/AllComponents/allComList.es');
var Base = require('modules/monitoring/Base.es');
module.exports = {
    components: {},
    data: function () {
        return {
            allComList: {},
            searchtxt: ''
        };
    },
    watch: {
        'searchtxt': {
            handler: function (val, oldVal) { 
                this.search();
            } 
        }
    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        var array = allComList;
        var result = {};
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            if (!result[element.groupName]) {
                result[element.groupName] = [];
            }
            result[element.groupName].push(element);
        }
        this.allComList = result;
    },
    methods: {
        addToPaint: function (item) {
            var dom = item.renderToCanvas();
            Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.ADD_NEWUNIT, [dom]);
        },
        search: function () { 
            var self = this;
            var object = this.allComList;
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    var array = object[key];
                    array.forEach(function (element) {
                        // console.log(self.searchtxt);
                        if (self.searchtxt.length > 0) {
                            if (element.desc.indexOf(self.searchtxt) > -1 || element.name.indexOf(self.searchtxt) > -1) {
                                element.isActive = true;
                            } else {
                                element.isActive = false;
                            }
                        } else {
                            element.isActive = false;
                        }
                    }, this);
                }
            }
        }
    }
};