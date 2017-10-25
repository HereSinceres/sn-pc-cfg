<div>
    <CommonStyle :$dom="$dom" :data="data" :uuid="uuid"></CommonStyle>
    <CommonAttr :$dom="$dom" :data="data" :uuid="uuid"></CommonAttr>

    <div class="box box-cfgset  flat">
        <div class="box-header with-border">
            <h3 class="box-title">私有属性</h3>
            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" v-on:click='ok'><i class="fa fa-check-circle-o"></i>
                            </button>
            </div>
        </div>
        <div class="box-body form-horizontal">
        </div>
    </div>
    <div class="box box-cfgset  flat">
        <div class="box-header with-border">
            <h3 class="box-title">输出属性</h3>
            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" v-on:click='toggleOutPut(1)'><i class="fa fa-cog"></i>
                    </button>
            </div>
        </div>
    </div>

    <div class="modal flat fade in" style="display:block;" v-if="isShowOutPutDialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" v-on:click="toggleOutPut(0)">
                              <span>×</span>
                        </button>
                    <h4 class="modal-title">输出属性</h4>
                </div>
                <div class="modal-body form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">变量</label>
                        <div class="col-sm-10">
                            <select class="form-control" v-model="cfg_var_binded_ouput">
                                <option v-for="item in variable" v-bind:value="item.vid">
                                  {{ item.vName }}: {{ item.vValue }}
                                </option>
                              </select>
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