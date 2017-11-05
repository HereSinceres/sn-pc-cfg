
var api = require('modules/monitoring/dataService/api.es');
var store = require('modules/monitoring/dataService/store.es');
var imagListsrc = [__uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/参数背景.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/复位亮 (2).PNG'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/复位暗 (2).PNG'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关3关.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关3开.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关4关.GIF.PNG'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关4关.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关4开.GIF.PNG'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关4开.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关5关.GIF.PNG'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关5关.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关5开.GIF.PNG'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关5开.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关按钮2关.GIF.PNG'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关按钮2关.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关按钮2开.GIF.PNG'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关按钮2开.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关按钮关.GIF.PNG'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关按钮开.GIF.PNG'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关按钮关.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/开关按钮开.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/总开关0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/总开关1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/手动.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/报警灯0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/报警灯1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/报警灯正常.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/报警闪烁灯.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/指示灯1-0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/指示灯1-1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮1-0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮1-1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮10-0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮10-1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮11-0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮11-1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮12-0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮12-1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮13-0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮13-1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮14-0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮14-1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮2-0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮2-1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮3-0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮3-1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮3down.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮3hover.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮3up.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮4-0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮4-1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮5-0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮5-1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮6-0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮6-1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮7-0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮7-1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮8-0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮8-1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮9-0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮9-1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮DOWN.GIF.PNG'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮HOVER.GIF.PNG'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮UP.GIF.PNG'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮down.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮hover.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/按钮up.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/旋钮1.GIF.PNG'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/旋钮2.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/温度.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/温度显示图标.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/自动.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/菜单.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/菜单选中.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/按钮开关素材/退出按钮.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/1号库1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/2.jpg'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/SMART200.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/低温减压储藏实验台.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/储液器.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/储液罐.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/冷库实体.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/冷风机.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/冷风机小.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/冷风机小0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/单机单库冷库图标.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/单机单库冷库图标1.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/压缩机图标.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/双缸压缩机.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/双缸压缩机关.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/壳管换热器.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/壳管换热器竖.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/效果图.jpg'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/机组冷库末端.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/板换.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/桶泵.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/气分.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/气液分离器2.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/水泵图标.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/油分.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/油分2.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/油分灰.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/泵.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/泵.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/流动箭头.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/电热式蒸汽加湿器.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/电磁阀关.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/电磁阀开.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/管道.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/空调净化设备.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/管道1.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/管道2.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/约克机组.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/翅片管换热器.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/背景图.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/节点.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/节点2.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/节点3.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/蒸发冷.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/蒸发冷2.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/螺杆机.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/螺杆机0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/西门子1200PLC.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/超声波加湿器.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/超市小冷库.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/陈列柜.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/风扇.gif'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/风扇0.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/风机.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/设备素材/风机灰色.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/阀件素材/电磁阀2关.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/阀件素材/电磁阀2开.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/阀件素材/电磁阀关.png'),
    , __uri('modules/monitoring/baseComponents/imagelist/阀件素材/电磁阀开.png')];
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
                    <h4 class="modal-title">图库
                    <input type="text" class="form-control" placeholder="查询条件" v-model='searchtxt'></h4> 
                </div>
                <div class="modal-body form-horizontal ms-input-file-container clearfix">
                    <div class='ms-input-file-item ' v-for='item in imagListsrc' v-on:click='choose(item)' v-if='item'>
                       <img :src='item'> 
                    </div>
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
            imagListsrc: imagListsrc,
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
            console.log('search');
            var self = this;
            this.imagListsrc = imagListsrc.filter(function (element) {
                if (self.searchtxt.length > 0) {
                    return (element.indexOf(self.searchtxt) > -1)
                } else {
                    return true;
                }
            });

        }
    }
}