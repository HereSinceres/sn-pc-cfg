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
            copyCfg: null,
            userInfo:{},
            avator:'',
            badgeNumber:0,
            MessageList:[],
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
            return true;
        });
        this.proList = store.proList.filter(function (ele) {
            return ele.PName;
        });
        this.getCfgList();
        this.headInfo();
        this.GetMessageList();
        this.GetMessageCount();
    },
    methods: {
        headInfo:function(){
            var info = store.getUserInfo();
            var self = this;
            if(info!=null){
                if(info.type==1){
                    api.GetUser().then(function (res) {
                      self.userInfo.sysName = res.Data.Tel || '';
                      self.userInfo.sysUserName = res.Data.UserName;
                      self.userInfo.sysUserAvatar = res.Data.HeadPhoto || avator;
                      self.userInfo.sysUserType = res.Data.UserType;
                      self.userInfo.sysUserState = res.Data.AuthenticationState;
                    });
                 
                }else{
                    api.GetEnterpriseInfo().then(function (res) {
                        self.userInfo.sysName = res.Data.UserName || '';
                        self.userInfo.sysUserName = res.Data.EnterpriseName || '';
                        self.userInfo.sysUserAvatar = res.Data.HeadPhoto || avator;
                        self.userInfo.sysUserType = res.Data.UserType;
                        self.userInfo.sysUserState = res.Data.AuthenticationState
                    });
                 
                  
                }
            }
            
        },
        help(){
             window.open('http://help.cloudhvacr.com');
        },
        logout: function () {
            var self = this;
            
            bootbox.confirm("确认退出吗?", function (result) {
                if (result) {
                    window.location.href = 'http://pctest.cloudhvacr.com';
                }
            });
        },
        userInformation(){
            window.location.href = 'http://pctest.cloudhvacr.com/#/userData';
        },
        GetMessageCount(){
            var self = this;
            api.GetMessageCount({messageTypes:[3]}).then(function (res) {
                if(res.success){
                    self.badgeNumber = res.Data;
                  }
            })
        },
        GetMessageList(){
            var self = this;
            api.MessageList({
                messageTypes:[2,3,4],
                messageState:0
            }).then(function (res) {
                if(res.success){
                    res.Data.map((item,index)=>{
                    if(index<4){
                            item.CreatTime =self.ChangeDateFormat(item.CreatTime);
                            self.MessageList.push(item);
                        }
                    })
                  }
            })
        },
        ChangeDateFormat(cellval) {

            var date = new Date(parseInt(cellval.replace("/Date(", "").replace(")/", ""), 10));

            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;

            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var Minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var second =  date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            return date.getFullYear() + "-" + month + "-" + currentDate+' '+hour +':'+Minutes + ':'+second;

        },
        getCfgList: function () {
            this.activeProId = this.$route.query.proId;
            var self = this;
            if (this.activeProId) {
                getCFGListByProId(this.activeProId, function () {
                    self.cfgList = store.cfgList;
                });
            } else {
                api.getProList().then(function (res) {
                    store.proList = res.rows;
                    self.$router.push({ path: '/ProjectCFGList', query: { proId: store.proList[0].ProjectId } });
                });
            }
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