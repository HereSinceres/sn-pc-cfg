module.exports = {
    setItem: function (data) {
        localStorage.setItem('variable', JSON.stringify(data));
    },
    getItem: function () {
        return JSON.parse(localStorage.getItem('variable'));
    },
    getValueByVar: function (variable) {
        var result = null;
        debugger
        this.getItem().forEach(function (element) {
            if (element.vid == variable) {
                result = element.vValue;
            }
        }, this);
        return result;
    }
};