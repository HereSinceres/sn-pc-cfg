var ConfigPage = require('./view/ConfigPage/index.es');
var ProjectCFGList = require('./view/ProjectCFGList/index.es');
var CfgOnline = require('./view/CfgOnline/index.es');
var api = require('modules/monitoring/dataService/api.es');
var store = require('modules/monitoring/dataService/store.es');

function getCFGListByProId(proId, callback) {
    api.getCFGListByProId(proId).then(function (res) {
        store.cfgList = res.Data;
        if (store.cfgList.length > 0) {
            callback();
        }
    }, function (error) { });
}
function getCfgManagementById(params, callback) {
    api.getCfgManagementById(params.cfgId).then(function (res) {
        store.currentCfg = res.Data;
        api.getVarValueByProId(
            store.currentCfg.proId
        ).then(function (res) {
            if (!!res.Data && res.Data.length > 0) {
                res.Data = res.Data.map(function (x) {
                    x.IsAcVar = x.IsAcquisitionVariable;
                    x.vName = x.VName;
                    x.vValue = x.OriginalValue;
                    x.vid = x.EVaribaleId;
                    return x;
                });
                store.variable = res.Data.sort(function (a, b) {
                    return a.vName.localeCompare(b.vName);
                });
            } else {
                store.variable = [];
            }
            store.variable.unshift({
                IsAcVar: true,
                vName: "请选择",
                vValue: null,
                vid: null
            })
            callback();
        })
    })
}
var routes = [{
    path: "*",
    redirect: "/"
}, {
    path: '/',
    beforeEnter: (to, from, next) => {
        next('/ProjectCFGList');
    }
},
{
    path: '/ProjectCFGList',
    component: ProjectCFGList,
    beforeEnter: (to, from, next) => {
        api.getProList().then(function (res) {
            store.proList = res.rows;
            if (to.query.proId) {
                next();
                return;
            }
            jump(store.proList[0].ProjectId);
        });
        function jump(proId) {
            if (proId) {
                next({ path: '/ProjectCFGList', query: { proId: proId } });
            }
        }

    }
},
{
    name: 'cfg',
    path: '/cfg/:cfgId',
    component: ConfigPage,
    beforeEnter: (to, from, next) => {
        getCfgManagementById(to.params, function () {
            next();
        })
    }
},
{
    name: 'CfgOnline',
    path: '/cfgOnline/:cfgId',
    component: CfgOnline,
    beforeEnter: (to, from, next) => {
        getCfgManagementById(to.params, function () {
            next();
        })
    }
},
{
    name: 'CfgOnlineByProId',
    path: '/cfgOnlineByProId/:proId',
    component: CfgOnline,
    beforeEnter: (to, from, next) => {
        getCFGListByProId(to.params.proId, function () {
            var home = store.cfgList[0];
            if (home) {
                store.cfgList.forEach(function (element) {
                    if (element.tag == 1) {
                        home = element;
                    }
                }, this);
                next({ name: 'CfgOnline', params: { cfgId: home.id } });
            } else {
                next({ name: 'ProjectCFGList' })
            }
        })
    }
}
];

module.exports = routes;