<div>
    <CommonStyle :uuid="uuid"></CommonStyle>

    <CommonAttr :uuid="uuid"></CommonAttr>
    <div class="box box-cfgset  flat">
        <div class="box-header with-border">
            <h3 class="box-title">绑定变量</h3>
            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" v-on:click='toggleOutPut(1)'>
                    <i class="fa fa-cog"></i>
                </button>
            </div>
        </div>
    </div>
    <div class="modal flat fade in" style="display:block;" v-if="isShowOutPutDialog">
        <div class="modal-dialog modal-dialog--cfg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" v-on:click="toggleOutPut(0)">
                        <span>×</span>
                    </button>
                    <h4 class="modal-title">绑定变量</h4>
                </div>
                <div class="modal-body form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">变量</label>
                        <div class="col-sm-10"> 
                            <ms-input-var-search v-model="cfg_var_binded_ouput"  >
                            </ms-input-var-search>  
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">结果
                            <span class="fa fa-plus" v-on:click='addOperate()'></span>
                        </label>
                        <div class="col-sm-10">
                            <div class="row form-group" v-for="item in cfg_var_binded_ouput_deal">
                                <div class="col-xs-2">
                                    <div class="form-control" style="text-align: center;">
                                        <span class="fa fa-trash-o " v-on:click='removeOperate(item)'></span>
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <select class="form-control" v-model="item.operator">
                                        <option v-for="(value, key) in operatorList" v-bind:value="value">
                                            {{ key }}: {{ value }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-xs-2">
                                    <input type="text" class="form-control" v-model="item.initValue" placeholder="值">
                                </div>
                                <div class="col-xs-5">
                                    <div class="form-group" v-for="cal in item.callback">
                                        <div class="col-sm-12">
                                            <ms-input-color-pick v-if="cal.attr=='borderColor'" v-model="cal.value" :placeholder="cal.name">
                                            </ms-input-color-pick>
                                            <input v-else type="text" class="form-control" v-model="cal.value" :placeholder="cal.name">
                                        </div>
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

    <div class="box box-cfgset  flat">
        <div class="box-header with-border">
            <h3 class="box-title">私有属性</h3>
            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" v-on:click='togglePrivateAttr(1)'>
                    <i class="fa fa-cog"></i>
                </button>
            </div>
        </div>
    </div>
    <div class="modal flat fade in" style="display:block;" v-if="isShowPrivateAttrDialog">
        <div class="modal-dialog modal-dialog--cfg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" v-on:click="togglePrivateAttr(0)">
                        <span>×</span>
                    </button>
                    <h4 class="modal-title">私有属性</h4>
                </div>
                <div class="modal-body form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">宽度</label>
                        <div class="col-sm-9">
                            <ms-input-font-size v-model='borderWidth'></ms-input-font-size>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">颜色</label>
                        <div class="col-sm-9">
                            <ms-input-color-pick v-model='borderColor'></ms-input-color-pick>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">背景</label>
                        <div class="col-sm-9">
                            <ms-input-color-pick v-model='backgroundColor'></ms-input-color-pick>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">圆角</label>
                        <div class="col-sm-9">
                            <ms-input-font-size v-model='borderRadius'></ms-input-font-size>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">线条样式</label>
                        <div class="col-sm-9">
                            <ms-input-border-style v-model='borderStyle'></ms-input-border-style>
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