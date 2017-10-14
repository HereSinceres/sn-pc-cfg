var store = require('modules/monitoring/dataService/store.es');
var variable = require('modules/monitoring/dataService/variable.es');
module.exports = {
    getProList: function (callback) {
        console.log('get getProList');
        store.proList = [{
            id: 1,
            proName: 'pro1'
        }, {
            id: 2,
            proName: 'pro2'
        }];
        this.getCFGListByProId(callback);
    },
    getCFGListByProId: function (callback) {
        console.log('get cfgList');
        store.cfgList = [{
            id: 1,
            proId: 1,
            cfgName: '项目1'
        }];
        this.getVarValueByCFGId(1,callback) 
    },
    getVarValueByCFGId: function (cfgId, callback) {
        console.log('get getVarValueByCFGId');
        variable.setItem = [{
            id: 1,
            cfgId: 1,
            name: 'var1',
            value: 123
        }];
        callback();
    },
    // 设置变量接口
    setValByValId:function(){

    }
};