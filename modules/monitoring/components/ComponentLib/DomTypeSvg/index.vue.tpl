<div>
    <CommonStyle :uuid="uuid"></CommonStyle>
    <CommonAttr :uuid="uuid"></CommonAttr>
    <div class="box box-cfgset  flat">
        <div class="box-header with-border">
            <h3 class="box-title">输入属性</h3>
            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" v-on:click='togglePath(1)'>
                    <i class="fa fa-cog"></i>
                </button>
            </div>
        </div>
    </div>
    <div class="modal flat fade in" style="display:block;" v-if="isShowPathDialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" v-on:click="togglePath(0)">
                        <span>×</span>
                    </button>
                    <h4 class="modal-title">配置</h4>
                </div>
                <div class="modal-body form-horizontal">
                    <textarea class="form-control" v-model="svgPath" style="resize: none;height: 220px;"> 
                    </textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info " v-on:click="ok()">保存</button>
                </div>
            </div>
        </div>
    </div>
</div>