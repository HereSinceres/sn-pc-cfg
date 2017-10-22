module.exports = {
  proList: [],
  cfgList: [],
  currentCfg: [],
  variable: {},
  getUserInfo: function () {
    return JSON.parse(localStorage.getItem('Au_USERINFO'));
  },
  getValueByVar: function (variable) {
    var result = null;
    this.variable.forEach(function (element) {
      if (element.vid == variable) {
        result = element.vValue;
      }
    }, this);
    return result;
  }
};