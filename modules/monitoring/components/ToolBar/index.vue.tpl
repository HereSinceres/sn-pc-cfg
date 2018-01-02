<div class='tool-bar clearfix'>
    <!-- <i title="保存" class="tool-btn fa fa-floppy-o"></i> --> 
    <!-- <span title="多选" class="tool-btn" v-on:click='toggleMulSelection' v-bind:class="{'active':isMulSelection}">多选</span> -->
   <span title="左对齐" class="tool-btn fa fa-align-left" v-on:click='alginClick("left")' ></span>  
   <span title="右对齐" class="tool-btn fa fa-align-right" v-on:click='alginClick("right")' ></span>  
    <span title="提交" class="tool-btn pull-right fa fa-upload" v-on:click='save'></span>
    <span title="模拟运行" class="tool-btn pull-right fa fa-play" v-on:click="run()"> </span>
    <span title="数据模拟开关" class="tool-btn pull-right fa fa-bug" v-on:click="toggleControlInEffect" v-bind:class="{'active':!isDebuggerFireToOnline}"></span>
    <span title="数据模拟" class="tool-btn pull-right fa fa-database" v-on:click="toggleVariableSet(1)"></span>
    <span title="全局设置" class="tool-btn pull-right fa fa-cog" v-on:click="toggleCanvasSet(1)"></span>
    <span title="放大" class="tool-btn pull-right fa fa-expand" v-on:click='expand'></span>
    <span title="当前缩放" class="tool-btn pull-right  " v-on:click='reset'> {{this.currentScale}}</span>
    <span title="缩小" class="tool-btn pull-right fa fa-compress" v-on:click='compress'></span>

    <span title="存为图片" class="tool-btn pull-right fa fa-download" v-on:click='downlode'></span>




    <!-- 全局设置 -->
    <div class="modal fade in" style="display:block;" v-if="isShowCanvasSetDialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" v-on:click="toggleCanvasSet(0)">
                        <span>×</span>
                    </button>
                    <h4 class="modal-title">全局设置</h4>
                </div>
                <div class="modal-body form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">宽</label>
                        <div class="col-sm-9">
                            <ms-input-font-size v-model='canvas.w'></ms-input-font-size>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">高</label>
                        <div class="col-sm-9">
                            <ms-input-font-size v-model='canvas.h'></ms-input-font-size>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">背景颜色</label>
                        <div class="col-sm-9">
                            <ms-input-color-pick v-model='canvas.bg'></ms-input-color-pick>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">刷新频率[s]</label>
                        <div class="col-sm-9">
                            <input type="number" class="form-control" v-model='cfg.refreshTimer'>
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
        <div class="modal-dialog modal-dialog--cfg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" v-on:click="toggleVariableSet(0)">
                        <span>×</span>
                    </button>
                    <h4 class="modal-title">数据模拟</h4>
                </div>
                <div class="modal-body">
                    <ms-json-editor style="min-height:520px; font-family: monospace;" class="form-control" v-model="variable"></ms-json-editor>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-info " v-on:click="saveMockVariable()">保存</button>
                </div>
            </div>
        </div>
    </div>
</div>