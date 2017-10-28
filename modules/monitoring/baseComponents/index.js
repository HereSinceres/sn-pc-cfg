var Vue = require('modules/lib/vue/vue.js');
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
            var localValue = 12;
        }
        return {
            localValue: localValue
        };
    },
    methods: {
        onInput: function (value, e) {
            this.localValue = value;
            console.log('input');
            this.$emit('input', this.localValue + 'px');
        },
        onChange: function (value, e) {
            this.localValue = value;
            console.log('change');
            this.$emit('change', this.localValue + 'px');
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
            var localValue = '#808080';
        }
        return {
            localValue: localValue
        };
    },
    methods: {
        onInput: function (value, e) {
            this.localValue = value;
            console.log('input');
            this.$emit('input', this.localValue);
        },
        onChange: function (value, e) {
            this.localValue = value;
            console.log('change');
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
   {{localValue}}
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
            debugger
            let self = this;
            if (!file || !window.FileReader) {
                return;
            }

            // if (/^image/.test(file.type)) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                self.localValue = this.result;
                self.$emit('change', self.localValue);
                self.$emit('input', self.localValue);
            };
            // }
        }
    }
});
