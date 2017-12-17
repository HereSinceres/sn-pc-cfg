
var api = require('modules/monitoring/dataService/api.es');
var store = require('modules/monitoring/dataService/store.es');
var imgListJson = require('modules/monitoring/baseComponents/imgListJson.json');


module.exports = {
    props: {
        value: {
            default: null
        }
    },
    template: `
    <div class="row  ">
    <div class="col-xs-4">
        <button class="form-control" v-on:click='toggleImageList(1)' style='    font-size: 12px;
        margin: 0;
        padding: 0;'>
            图库
        </button>
    </div>
    <div class="col-xs-8  ">
        <input class="form-control  " type='file' @input="onInput($event.target.value, $event)" @change="onChange($event.target.value, $event)"
        />
    </div>
    <div ref="dialog" class="modal  flat fade in" style="display:block;" v-show="isShowImageListDialog">
        <div class="modal-dialog modal-dialog--cfg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" v-on:click="toggleImageList(0)">
                        <span>×</span>
                    </button> 
                    <input type="text" class="form-control" placeholder="查询条件" v-model='searchtxt' style="
                        width: 400px;
                        display: inline;
                    "> 
                </div> 
                <div class="modal-body form-horizontal ms-input-file-container clearfix">
                    <template v-if='imagListsrc' v-for="list in imagListsrc">
                        <div class="group-head">{{list.type}}</div> 
                        <div class="clearfix group-body"> 
                                <div class='ms-input-file-item ' v-for='item in list.list' v-on:click='choose(item)' v-if='item'>
                                <img :src='item'> 
                                </div> 
                        </div>
                    </template> 
                </div> 
            </div>
        </div>
    </div>
</div>
   `,
    data: function () {
        var localValue = this.value;
        return {
            searchtxt: "",
            imagListsrc: imgListJson.slice(),
            localValue: localValue,
            isShowImageListDialog: false
        };
    },
    mounted: function () {
        document.body.appendChild(this.$refs.dialog);
    },
    watch: {
        'searchtxt': {
            handler: function (val, oldVal) {
                this.search();
            }
        }
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
        },
        choose: function (item) {
            this.localValue = 'url("' + item + '")';
            this.$emit('change', this.localValue);
            this.$emit('input', this.localValue);
            this.toggleImageList(0);
        },
        toggleImageList: function (isShow) {
            this.isShowImageListDialog = isShow;
        },
        search: function () {
            var self = this;
            var copy = imgListJson.slice();
            var result = [];
            for (var i = 0; i < copy.length; i++) {
                var element = copy[i];
                var eleCopy = Object.assign({}, element);
                eleCopy.list = [];
                for (var j = 0; j < element.list.length; j++) {
                    var el = element.list[j];

                    var temp = false;
                    if (self.searchtxt.length > 0) {
                        if (el && (el.indexOf(self.searchtxt) > -1)) {
                            temp = el;
                        }
                    } else {
                        temp = el;
                    }
                    if (temp) {
                        eleCopy.list.push(temp);
                    };
                }
                result.push(eleCopy);
            }
            this.imagListsrc = result;

        }
    }
}