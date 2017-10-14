<div>
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
      <label class="col-sm-2 control-label">绑定变量</label>
      <div class="col-sm-10">
        <select class="form-control" v-model="cfg_var_binded_input">
                  <option v-for="(value, key) in variable" v-bind:value="key">
                      {{ key }}: {{ value }}
                  </option>
              </select>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">输入提示语</label>
      <div class="col-sm-10">
        <input type="text" v-model='cfg_var_binded_input_tip' class="form-control">
      </div>
    </div>
  </div>
  <!--输入属性不同 结果不同-->
  <div v-if="cfg_attr_input==3">
    <div class="form-group">
      <label class="col-sm-2 control-label">绑定变量</label>
      <div class="col-sm-10">
        <select class="form-control" v-model="cfg_var_binded_input">
                      <option v-for="(value, key) in variable" v-bind:value="key">
                          {{ key }}: {{ value }}
                      </option>
                  </select>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-2 control-label">输入操作</label>
      <div class="col-sm-5">
        <select class="form-control" v-model="cfg_var_binded_input_ctr">
            <option v-for="option in inputCtrList" v-bind:value="option.id">
                      {{ option.desc }}
            </option>
        </select>
      </div>
      <div class="col-sm-5" v-if='(cfg_var_binded_input_ctr&&cfg_var_binded_input_ctr==4)'>
        <input type="text" v-model='cfg_var_binded_input_value' class="form-control">
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
  <div class="clearfix">
    <button class="btn btn-info pull-right" v-on:click='ok'>确认</button>
  </div>
</div>