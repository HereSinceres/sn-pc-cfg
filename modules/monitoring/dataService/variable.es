module.exports = {
    setItem: function (data) {
        localStorage.setItem('variable', JSON.stringify(data));
    },
    getItem: function () { 
        if (localStorage.getItem('variable')!= 0 ) {
            return JSON.parse(localStorage.getItem('variable'));
        }
        else {
            return {
                variable_1: 1,
                variable_2: 2,
                variable_3: 3
            };
        }
    }
};
