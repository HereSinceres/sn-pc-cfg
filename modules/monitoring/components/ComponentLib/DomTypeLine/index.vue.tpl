<div>
    <CommonStyle :$dom="$dom" :data="data"></CommonStyle>
    <CommonAttr :$dom="$dom" :data="data"></CommonAttr>

    <div class="box box-cfgset  flat">
        <div class="box-header with-border">
            <h3 class="box-title">私有属性</h3>
            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" v-on:click='ok'><i class="fa fa-check-circle-o"></i>
                        </button>
            </div>
        </div>
        <div class="box-body form-horizontal">
            <div class="form-group">
                <label class="col-sm-2 control-label">线条宽度</label>
                <div class="col-sm-10">
                    <ms-input-font-size v-model='strokeWidth'></ms-input-font-size>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">颜色</label>
                <div class="col-sm-10">
                    <input type="color" class="form-control" v-model='stroke' placeholder="red">
                </div>
            </div>
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
                        <label class="col-sm-2 control-label">变量 </label>
                        <div class="col-sm-10">
                            <select class="form-control" v-model="cfg_var_binded_ouput">
                                                <option v-for="item in variable" v-bind:value="item.vid">
                                                {{ item.vName }}: {{ item.vValue }}
                                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">结果
                                <span class="fa fa-plus" v-on:click='addOperate()'></span>  
                        </label>
                        <div class="col-sm-10">
                            <div v-for="item in cfg_var_binded_ouput_deal">
                                <div class="form-group">
                                    <div class="col-sm-2">
                                        <div class="form-control" style="text-align: center;">
                                            <span class="fa fa-trash-o " v-on:click='removeOperate(item)'></span>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <select class="form-control" v-model="item.operator">
                                    <option v-for="(value, key) in operatorList" v-bind:value="value">
                                                  {{ key }}: {{ value }}
                                    </option>
                                    </select>
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control" v-model="item.initValue" placeholder="值">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-6" v-for="cal in item.callback">
                                        <ms-input-font-size v-if="cal.attr =='strokeWidth'" v-model="cal.value"></ms-input-font-size>
                                        <ms-input-color-pick v-if="cal.attr =='stroke'" v-model="cal.value"></ms-input-color-pick>
                                    </div>
                                </div>
                            </div>
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