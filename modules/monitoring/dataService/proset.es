module.exports  = {
  setItem: function (data) {
      localStorage.setItem('PROJECT_SETTING', data);
  },
  getItem: function () {
      return localStorage.getItem('PROJECT_SETTING');
  }
};