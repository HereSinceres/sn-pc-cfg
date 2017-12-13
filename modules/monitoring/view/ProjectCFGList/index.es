var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');

var baseSetting = require('modules/monitoring/components/ComponentLib/baseSetting.es');
var api = require('modules/monitoring/dataService/api.es');
var store = require('modules/monitoring/dataService/store.es');

function getCFGListByProId(proId, callback) {
    api.getCFGListByProId(proId).then(function (res) {
        store.cfgList = res.Data;
        if (store.cfgList.length > 0) {
            callback();
        } else {
            var data = {
                id: '',
                proId: proId,
                cfgName: '默认配置',
                html: '',
                tag: 0
            };
            // 创建一个默认组态界面
            api.AddCfgManagement(data).then(function () {
                getCFGListByProId(proId, callback);
            })
        }
    }, function (error) { });
}
module.exports = {
    props: [],
    components: {

    },
    data: function () {
        return {
            proList: [],
            cfgList: [],
            activeProId: null,
            activeCfgId: null,
            isShowCopyDialog: false,
            copyProId: null,
            copyCfgList: [],
            copyToCfg: null,
            copyCfg: null
        };
    },
    computed: {
        // 计算属性的 getter
        activeProName: function () {
            var result = '';
            var array = this.proList;
            for (var index = 0; index < array.length; index++) {
                var element = array[index];
                if (element.ProjectId == this.activeProId) {
                    result = element.PName;
                }
            }
            return result;
        }
    },
    watch: {
        '$route'(to, from) {
            this.getCfgList();
        }
    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        this.cfgList = store.cfgList.filter(function (ele) {
            console.log(2222, ele);
            return true;
        });
        this.proList = store.proList.filter(function (ele) {
            return ele.PName;
        });
        this.getCfgList();
    },
    methods: {

        getCfgList: function () {
            this.activeProId = this.$route.query.proId;
            var self = this;
            getCFGListByProId(this.activeProId, function () {
                self.cfgList = store.cfgList;
            });
        },
        jumpToProId: function (item) {
            this.$router.push({ path: '/ProjectCFGList', query: { proId: item.ProjectId } });
        },
        jump: function (item) {
            // this.isShowCfg = false;
        },
        addCfg: function () {
            if (!this.activeProId) {
                return;
            }
            var self = this;
            var data = {
                id: '',
                proId: this.activeProId,
                cfgName: '',
                html: '',
                tag: 0
            };
            bootbox.prompt('输入组态名称', function (result) {
                if (result != null) {
                    data.cfgName = result;
                    // 创建一个默认组态界面
                    api.AddCfgManagement(data).then(function () {
                        getCFGListByProId(data.proId, function () {
                            self.cfgList = store.cfgList;
                        })
                    })
                }
            });
        },
        modifyCfg: function (data) {
            bootbox.prompt('输入组态名称', function (result) {
                if (result != null) {
                    data.cfgName = result;
                    api.UpdateCfgManagement(data);
                }
            });
        },
        delCfg: function (item) {
            var self = this;
            bootbox.confirm("确认是否删除!", function (result) {
                if (result) {
                    api.DeleteCfgManagement(item.id).then(function () {
                        let index = store.cfgList.indexOf(item);
                        store.cfgList.splice(index, 1);
                        self.cfgList = store.cfgList;
                    })
                }
            });
        },
        sethome: function (item) {
            var self = this;
            api.SetTopCfgManagementById(item.id).then(function () {
                self.getCfgList();
            })
        },
        copy: function (item) {
            this.copyToCfg = item;
            this.isShowCopyDialog = true;
        },
        copyOk: function () {
            var self = this;
            this.copyToCfg.html = this.copyCfg.html;
            api.UpdateCfgManagement(this.copyToCfg).then(function () {
                $.notify({
                    message: '复制成功'
                });
                self.isShowCopyDialog = false;
            });
        },
        selectCopyProId: function () {
            var self = this;
            api.getCFGListByProId(this.copyProId).then(function (res) {
                self.copyCfgList = res.Data.slice();
                self.copyCfg = self.copyCfgList[0];
                $.notify({
                    message: '请选择组态配置'
                });
            }, function (error) { });
        }
    }
};