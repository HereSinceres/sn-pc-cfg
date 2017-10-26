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
        this.variable.forEach(function(element) {
            if (element.vid == tempVar) {
                result = element.vValue;
            }
        }, this);
        return result;
    }
};