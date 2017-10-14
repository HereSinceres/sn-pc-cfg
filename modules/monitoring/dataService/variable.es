module.exports = {
    setItem: function (data) {
        localStorage.setItem('variable', JSON.stringify(data));
    },
    getItem: function () {
        return JSON.parse(localStorage.getItem('variable'));
    }
};