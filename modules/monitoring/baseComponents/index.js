var Vue = require('modules/lib/vue/vue.js');
Vue.component('ms-input-font-size', {
  props: {
    value: {
      default: null
    },
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
    } catch (error) {
      var localValue = 12;
    }
    return {
      localValue: localValue
    }
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
    },
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
    } catch (error) {
      var localValue = '#808080';
    }
    return {
      localValue: localValue
    }
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
    },
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
    } catch (error) {
      var localValue = JSON.stringify({}, null, 4);
    }
    return {
      localValue: localValue
    }
  },
  methods: {
    onInput: function (value, e) {
      this.localValue = value;
      this.$emit('input', JSON.parse(value));
    },
    onChange: function (value, e) {
      this.localValue = value;
      this.$emit('change', JSON.parse(value));
    }
  }
});