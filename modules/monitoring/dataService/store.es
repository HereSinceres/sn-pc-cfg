
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}
module.exports = {
    proList: [],
    cfgList: [],
    currentCfg: [],
    variable: {},
    getUserInfo: function () {
        var userinfo = getCookie('Au_USERINFO');
        if (userinfo) {
            return JSON.parse(userinfo);
        }
        return JSON.parse(localStorage.getItem('Au_USERINFO'));        
    },
    // 需要格式化数据的时候才加第二个参数，例如 文本直接显示数据
    getValueByVar: function (tempVar, format) {
        var result = null;
        var array = this.variable;
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            if (element.vid == tempVar) {
                if (typeof (format) == 'undefined') {
                    result = element.vValue;
                }
                else {
                    if ($.isNumeric(element.vValue) && format != -1) {
                        result = Number(element.vValue).toFixed(format);
                    }
                    else {
                        result = element.vValue;
                    }
                }
            }

        }
        return result;
    }
};
