

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }

        return '<span class="' + cls + '">' + match + '</span>';
    });
}

module.exports = {
    components: {},
    data: function () {
        return {
            variable: [JSON.stringify(variable.getItem())]
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        this.format();
    },
    methods: {
        save: function () {
            try {
                variable.setItem(JSON.parse(this.variable));
                $.notify({
                    message: '保存成功'
                });
            } catch (error) {
                $.notify({
                    message: 'JSON 格式错误'
                }, {
                    type: 'danger'
                });
            }
        },
        format: function () {
            try {
                var str = JSON.stringify(JSON.parse(this.variable), undefined, 4);
                $('.J-mock-format').html(syntaxHighlight(str));
                $.notify({
                    message: '格式化成功'
                });
            } catch (error) {
                $.notify({
                    message: 'JSON 格式错误'
                }, {
                    type: 'danger'
                });
            }
        }
    }
};