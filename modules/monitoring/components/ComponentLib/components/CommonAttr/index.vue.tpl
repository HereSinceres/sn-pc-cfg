<div class="box box-cfgset  flat">
    <div class="box-header with-border">
        <h3 class="box-title">输入属性[公用]</h3>
        <div class="box-tools pull-right">
            <button type="button" class="btn btn-box-tool" v-on:click='ok'><i class="fa fa-check-circle-o"></i>
                </button>
        </div>
        <!-- /.box-tools -->
    </div>
    <!-- /.box-header -->
    <div class="box-body form-horizontal">
        <div class="form-group">
            <label class="col-sm-2 control-label">类型</label>
            <div class="col-sm-10">
                <select class="form-control" v-model="cfg_attr_input">
                        <option v-for="option in inputAttrList" v-bind:value="option.id">
                          {{ option.desc }}
                        </option>
                      </select>
            </div>
        </div>

        <!--输入属性不同 结果不同-->
        <div v-if="cfg_attr_input==2">
            <div class="form-group">
                <label class="col-sm-2 control-label">变量</label>
                <div class="col-sm-10">
                    <select class="form-control" v-model="cfg_var_binded_input">
              <option v-for="item in variable" v-bind:value="item.vid">
                {{ item.vName }}: {{ item.vValue }}
              </option>
            </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">文案</label>
                <div class="col-sm-10">
                    <input type="text" v-model='cfg_var_binded_input_tip' class="form-control">
                </div>
            </div>
        </div>
        <!--输入属性不同 结果不同-->
        <div v-if="cfg_attr_input==3">
            <div class="form-group">
                <label class="col-sm-2 control-label">变量</label>
                <div class="col-sm-10">
                    <select class="form-control" v-model="cfg_var_binded_input">
              <option v-for="item in variable" v-bind:value="item.vid">
                {{ item.vName }}: {{ item.vValue }}
              </option>
            </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">输入操作</label>
                <div class="col-sm-10">
                    <select class="form-control" v-model="cfg_var_binded_input_ctr">
                        <option v-for="option in inputCtrList" v-bind:value="option.id">
                            {{ option.desc }}
                        </option>
                    </select>
                    <input type="text" v-model='cfg_var_binded_input_value' class="form-control" v-if='(cfg_var_binded_input_ctr&&cfg_var_binded_input_ctr==4)' />
                </div>
            </div>
        </div>
    </div>
    <!--输入属性不同 结果不同-->
    <div v-if="cfg_attr_input==4">
        <div class="form-group">
            <label class="col-sm-2 control-label">跳转URL</label>
            <div class="col-sm-10">
                <input type="text" v-model='cfg_jump_url' class="form-control">
            </div>
        </div>
    </div>
</div>