<div>
    <div class="box box-cfgset  flat">
        <div class="box-header with-border">
            <h3 class="box-title">[公用]</h3>
            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" v-on:click='toggleCfg(1)'>
                    <i class="fa fa-cog"></i>
                </button>
            </div>
        </div>
    </div>
    <div class="modal flat fade in" style="display:block;" v-if="isShowCfgDialog">
        <div class="modal-dialog modal-dialog--cfg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" v-on:click="toggleCfg(0)">
                        <span>×</span>
                    </button>
                    <h4 class="modal-title">配置</h4>
                </div>
                <div class="modal-body form-horizontal">

                    <!--    <div class="form-group">
                <div class="col-sm-12 form-control">
                    {{uuid}}
                </div>
            </div>
             -->
                    <div class="form-group">
                        <label class="col-sm-2 control-label">x</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" v-model='x'>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">y</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" v-model='y'>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">宽</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" v-model='w'>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">高</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" v-model='h'>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">旋转</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" v-model='rotate'>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">层级</label>
                        <div class="col-sm-10">
                            <input type="number" min="0" max="100" class="form-control" v-model='zIndex'>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">小数位[-1 代表不格式化]</label>
                        <div class="col-sm-10">
                            <input type="number" min="-1" max="5" class="form-control" v-model='cfg_fix_num'>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info " v-on:click="ok()">保存</button>
                </div>
            </div>
        </div>
    </div>
</div>