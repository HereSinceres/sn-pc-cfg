<div class='tool-bar clearfix'>
    <!-- <i title="保存" class="tool-btn fa fa-floppy-o"></i> -->
    <i title="提交" class="tool-btn pull-right fa fa-upload" v-on:click='save'></i>
    <i title="画布设置" class="tool-btn  pull-right" v-on:click="toggleCanvasSet(1)">画布</i>
    <i title="数据模拟" class="tool-btn   pull-right" v-on:click="toggleVariableSet(1)">Mock</i>






    <!-- 画布设置 -->
    <div class="modal fade in" style="display:block;" v-if="isShowCanvasSetDialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" v-on:click="toggleCanvasSet(0)">
              <span>×</span>
            </button>
                    <h4 class="modal-title">画布设置</h4>
                </div>
                <div class="modal-body form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">宽</label>
                        <div class="col-sm-2">
                            <input type="number" class="form-control" v-model='canvas.w'>
                        </div>
                        <label class="col-sm-2 control-label">高</label>
                        <div class="col-sm-2">
                            <input type="number" class="form-control" v-model='canvas.h'>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">背景颜色</label>
                        <div class="col-sm-2">
                            <ms-input-color-pick v-model='canvas.bg'></ms-input-color-pick>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info " v-on:click="savePaintSet()">保存</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal flat fade in" style="display:block;" v-if="isShowVariableSetDialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" v-on:click="toggleVariableSet(0)">
                      <span>×</span>
                    </button>
                    <h4 class="modal-title">数据模拟</h4>
                </div>
                <div class="modal-body">
                    <ms-json-editor id="mock" style="min-height:520px; font-family: monospace;" class="form-control" v-model="variable"></ms-json-editor>
                </div>
            </div>
        </div>
    </div>
</div>