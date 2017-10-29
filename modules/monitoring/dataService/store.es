module.exports = {
    proList: [],
    cfgList: [],
    currentCfg: [],
    variable: {},
    getUserInfo: function () {
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
