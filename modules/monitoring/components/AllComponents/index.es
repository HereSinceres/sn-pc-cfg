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
        search: function (item) {
            // if(item.de)
            return true;
        }
    }
};