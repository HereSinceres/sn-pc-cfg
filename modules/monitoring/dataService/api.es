var store = require('modules/monitoring/dataService/store.es');

// 在拦截发送请求之前可以使用：
$.ajaxSetup({
    beforeSend: function (xhr) {
        try {
            xhr.setRequestHeader('token', store.getUserInfo().token);
        }
        catch (error) {
            $.notify({
                message: '登陆验证失败,请重新登陆'
            }, {
                    type: 'danger'
                });
        }
    }
});
// 在接受到数据后并执行完success做统一处理
$(document).ajaxSuccess(function (event, request, settings) { });
$(document).ajaxError(function (event, request, settings) {
    $.notify({
        message: '服务器正忙，请稍后重试'
    }, {
            type: 'danger'
        });
});
// 执行success之前
function beforeDealSuccess(data) {
    var isSuccess = data.success;
    if (!isSuccess) {
        $.notify({
            message: data.msg
        }, {
                type: 'danger'
            });
    }
}
// ajax 过滤器
$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    var success = options.success;
    options.success = function (data, textStatus, jqXHR) {
        beforeDealSuccess(data);
        // override success handling
        if (typeof (success) === 'function') {
            return success(data, textStatus, jqXHR);
        }

    };
    var error = options.error;
    options.error = function (jqXHR, textStatus, errorThrown) {
        // override error handling
        if (typeof (error) === 'function') {
            return error(jqXHR, textStatus, errorThrown);
        }

    };
});
module.exports = {
    getProList: function () {
        var url = '/UserAdmin/Project/ProjectList';
        return $.post(url, {
            IsMyproject: '',
            ProjectGroupId: '',
            pName: '',
            pageSize: 1000,
            pageNumber: 1
        });
    },
    GetUser: function (data) {
        var url = '/UserAdmin/UserAuthentication/GetUser';
        return $.post(url, data);
    },
    GetEnterpriseInfo: function (data) {
        var url = '/UserAdmin/UserAuthentication/GetEnterpriseInfoById';
        return $.post(url, data);
    },
    GetMessageCount: function (data) {
        var url = '/UserAdmin/Message/GetMessageCount';
        return $.ajax({
            url: url,
            data: JSON.stringify(data), 
            type: "POST",
            contentType: 'application/json'
        });

    },
    MessageList: function (data) {
        console.log(JSON.stringify(data));
        var url = '/UserAdmin/Message/MessageList';
        return $.ajax({
            url: url,
            data: JSON.stringify(data), 
            type: "POST",
            contentType: 'application/json'
        });

    },
    SetMessageReadedById: function (data) {
        var url = '/useradmin/Message/SetMessageReadedById';
        return $.post(url, data);
    },
    getCFGListByProId: function (proId) {
        var url = '/Useradmin/project/GetCfgManagementByProjectId';
        return $.post(url, {
            proId: proId
        });
    },
    getCfgManagementById: function (cfgId) {
        var url = '/Useradmin/project/getCfgManagementById';
        return $.post(url, {
            cfgId: cfgId
        });
    },
    AddCfgManagement: function (data) {
        var url = '/Useradmin/project/AddCfgManagement';
        return $.post(url, data);
    },
    UpdateCfgManagement: function (data) {
        var url = '/useradmin/Project/UpdateCfgManagement';
        return $.post(url, data);
    },
    DeleteCfgManagement: function (cfgId) {
        var url = '/useradmin/Project/DeleteCfgManagement';
        return $.post(url, {
            cfgId: cfgId
        });
    },
    SetTopCfgManagementById: function (cfgId) {
        var url = '/useradmin/Project/SetTopCfgManagementById';
        return $.post(url, {
            cfgId: cfgId
        });
    },
    getVarValueByProId: function (proId) {
        var url = '/useradmin/Project/GetVariableValueByProjectId';
        return $.post(url, {
            projectId: proId
        });
    },
    // 设置变量接口
    setValByValId: function (p) {
        var url = '/useradmin/EquipmentVariable/ChangeVariableValue';
        return $.post(url, {
            eVariableId: p.eVariableId,
            newValue: p.newValue
        });
    },
    // 获取历史数据接口
    GetAcquisitionVariableHistory: function (p) {
        var url = '/useradmin/AcquisitionGroup/GetAcquisitionVariableHistory';
        return $.post(url, {
            startTime: p.startTime,
            endTime: p.endTime,
            vEquipmentVariableId: p.vEquipmentVariableId
        });
    },
    // 上传接口
    UpLoadFile: function (pic) {
        var url = '/api/CommonUpLoad/UpLoadFile';
        return $.post(url, {
            pic: pic
        });
    }
};
