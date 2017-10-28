module.exports = {
    proList: [],
    cfgList: [],
    currentCfg: [],
    variable: {},
    getUserInfo: function() {
        return JSON.parse(localStorage.getItem('Au_USERINFO'));
    },
    getValueByVar: function(tempVar) {
        var result = null;
        var array =this.variable;
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            if (element.vid == tempVar) {
                result = element.vValue;
            }
        }
        return result;
    }
};