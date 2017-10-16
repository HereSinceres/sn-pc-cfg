module.exports = {
  proList: [],
  cfgList: [],
  getUserInfo: function () {
    return JSON.parse(localStorage.getItem('Au_USERINFO'));
  }
};