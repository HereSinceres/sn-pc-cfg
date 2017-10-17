var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var variable = require('modules/monitoring/dataService/variable.es');

var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');
var api = require('modules/monitoring/dataService/api.es');
var store = require('modules/monitoring/dataService/store.es');
module.exports = {
    props: [],
    components: {

    },
    data: function () {
        return {
            isShowPro: false,
            isShowCfg: false,
            proList: null,
            cfgList: null,
            choosePro: null,
            activeProId: null
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        this.cfgList = store.cfgList;
        this.proList = store.proList;
        this.activeProId = this.$route.params.proId;
    },
    methods: {
        toggleIsShowPro: function () {
            this.isShowPro = !this.isShowPro;
            if (!this.isShowPro) {
                this.isShowCfg = this.isShowPro;
            }
            if (this.isShowCfg) {
                this.isShowCfg = !this.isShowCfg;
            }
        },
        jumpPro: function (item) {
            this.choosePro = item;
            this.isShowPro = false;
            this.isShowCfg = true;
        },
        jump: function (item) {
            console.log(item);
            this.isShowCfg = false;
        },
        addCfg: function (item) {
            bootbox.prompt('输入组态名称', function (result) {
                console.log(result);
            });
        }
    }
};