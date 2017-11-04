var Vue = require('modules/lib/vue/vue.js');
var api = require('modules/monitoring/dataService/api.es');
let iconList = [{
    iconName: 'iconcfgfont icon-cfg-anniu3',
    name: '开关1'
},
{
    iconName: 'iconcfgfont icon-cfg-kaiguan2',
    name: '开关1'
},
{
    iconName: 'iconcfgfont icon-cfg-kaiguan1',
    name: '开关1'
},
{
    iconName: 'iconcfgfont icon-cfg-icon',
    name: '开关1'
},
{
    iconName: 'iconcfgfont icon-cfg-kaiguan3',
    name: '开关1'
},
{
    iconName: 'iconcfgfont icon-cfg-kaiguanguan',
    name: '开关1'
},
{
    iconName: 'iconcfgfont icon-cfg-anniu2',
    name: '开关1'
},
{
    iconName: 'iconcfgfont icon-cfg-anniu1',
    name: '开关1'
},
{
    iconName: 'iconcfgfont icon-cfg-kaiguanguan-copy',
    name: '开关1'
},
{
    iconName: 'iconcfgfont icon-cfg-kaiguan',
    name: '开关1'
},
{
    iconName: 'iconcfgfont icon-cfg-anniu',
    name: '开关1'
}
];
Vue.component('ms-input-font-size', {
    props: {
        value: {
            default: null
        }
    },
    template: `
   <div class="input-group">
   <input class="form-control"
   type='number'
   :value="localValue" 
   @input="onInput($event.target.value, $event)"
   @change="onChange($event.target.value, $event)"
   />
   <span class="input-group-addon">px</span>
  </div>
   `,
    data: function () {
        try {
            var localValue = this.value.match(/(\d*)px/)[1];
        }
        catch (error) {
            var localValue = null;
        }
        return {
            localValue: localValue
        };
    },
    methods: {
        onInput: function (value, e) {
            this.localValue = value;
            // console.log('input');
            this.$emit('input', this.localValue + 'px');
        },
        onChange: function (value, e) {
            this.localValue = value;
            // console.log('change');
            this.$emit('change', this.localValue + 'px');
        }
    }
});
Vue.component('ms-input-icon', {
    props: {
        value: {
            default: null
        }
    },
    template: `
    <div> 
        <a class="btn" v-for='item in iconList' v-on:click='setIcon(item)' v-bind:class="{'active':(item.iconName==localValue)}">
            <i :class='item.iconName'></i>
        </a>
    </div>
   `,
    data: function () {
        var localValue = this.value;
        return {
            iconList: iconList,
            localValue: localValue
        };
    },
    methods: {
        setIcon: function (item) {
            this.localValue = item.iconName;
            this.$emit('input', item.iconName);
            this.$emit('change', item.iconName);
        }
    }
});
Vue.component('ms-input-color-pick', {
    props: {
        value: {
            default: null
        }
    },
    template: `
  <div class="input-group">
  <input class="form-control"
  type='color'
  :value="localValue"
  @input="onInput($event.target.value, $event)"
  @change="onChange($event.target.value, $event)"
  /> <span class="input-group-addon">rgb</span></div>
  `,
    data: function () {
        try {
            var localValue = this.value;
        }
        catch (error) {
            var localValue = null;
        }
        return {
            localValue: localValue
        };
    },
    methods: {
        onInput: function (value, e) {
            this.localValue = value;
            // console.log('input');
            this.$emit('input', this.localValue);
        },
        onChange: function (value, e) {
            this.localValue = value;
            // console.log('change');
            this.$emit('change', this.localValue);
        }
    }
});

Vue.component('ms-json-editor', {
    props: {
        value: {
            default: null
        }
    },
    template: `
  <textarea  
  :value="localValue"
  @input="onInput($event.target.value, $event)"
  @change="onChange($event.target.value, $event)"></textarea>
   `,
    data: function () {
        try {
            var localValue = JSON.stringify(this.value, null, 4);
        }
        catch (error) {
            var localValue = JSON.stringify({}, null, 4);
        }
        return {
            localValue: localValue
        };
    },
    methods: {
        onInput: function (value, e) {
            try {
                this.localValue = value;
                var result = JSON.parse(value);
                this.$emit('input', result);
            }
            catch (error) {
                $.notify({
                    message: '数据格式错误'
                }, {
                        type: 'danger'
                    });
            }
        },
        onChange: function (value, e) {
            this.localValue = value;
            this.$emit('change', JSON.parse(value));
        }
    }
});

Vue.component('ms-input-file', {
    props: {
        value: {
            default: null
        }
    },
    template: `
   <div class="input-group">
   <input class="form-control"
   type='file' 
   @input="onInput($event.target.value, $event)"
   @change="onChange($event.target.value, $event)"
   />
  </div>
   `,
    data: function () {
        var localValue = this.value;
        return {
            localValue: localValue
        };
    },
    methods: {
        onInput: function (value, e) {
            this.localValue = value;
            this.$emit('input', this.localValue + 'px');
        },
        onChange: function (value, e) {
            var file = null;
            if (typeof e.target === 'undefined') {
                file = e[0];
            }
            else {
                file = e.target.files[0];
            }
            if (file) {
                let size = Math.floor(file.size / 1024);
                this.imgPreview(file);
            }

        },
        imgPreview: function (file) {
            let self = this;
            if (!file || !window.FileReader) {
                return;
            }

            // if (/^image/.test(file.type)) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                api.UpLoadFile(this.result).then(function (res) {
                    self.localValue = 'url("' + res.Data + '")';
                    self.$emit('change', self.localValue);
                    self.$emit('input', self.localValue);
                });
            };
        }
    }
});
Vue.component('ms-input-border-style', {
    props: {
        value: {
            default: null
        }
    },
    template: ` 
    <select class="form-control"
    v-model='localValue'
    :value="localValue" 
    @input="onInput($event.target.value, $event)"
    @change="onChange($event.target.value, $event)">
    <option v-for="option in list" v-bind:value="option.value">
        {{ option.name }}
    </option>
</select> 
   `,
    data: function () {
        var localValue = this.value.toString();
        return {
            list:
            [' dotted ', ' dashed ', ' solid ', ' double ', ' groove ', ' ridge ', ' inset ', ' outset'].map(function (ele) {
                return {
                    name: ele,
                    value: ele
                }
            }),
            localValue: localValue
        };
    },
    methods: {
        onInput: function (value, e) {
            this.localValue = value;
            // console.log('input');
            this.$emit('input', this.localValue);
        },
        onChange: function (value, e) {
            this.localValue = value;
            // console.log('change');
            this.$emit('change', this.localValue);
        }
    }
});
