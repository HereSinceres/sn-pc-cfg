<div class="nav-tabs-custom form-horizontal">
  <ul class="nav nav-tabs">
    <li class="active"><a href="#tab_1" data-toggle="tab">样式[公用]</a></li>
    <li class=""><a href="#tab_2" data-toggle="tab">输入属性[公用]</a></li>
    <li class=""><a href="#tab_3" data-toggle="tab">绑定变量</a></li>
    <li class=""><a href="#tab_4" data-toggle="tab">自定义SVG</a></li>
  </ul>
  <div class="tab-content">
    <div class="tab-pane active" id="tab_1">
      <CommonStyle :$dom="$dom" :data="data"></CommonStyle>
    </div>
    <div class="tab-pane" id="tab_2">
      <CommonAttr :$dom="$dom" :data="data"></CommonAttr>
    </div>
    <div class="tab-pane" id="tab_3">
      <div class="form-group">
        <label class="col-sm-2 control-label">绑定变量</label>
        <div class="col-sm-10">
          <select class="form-control" v-model="cfg_var_binded_ouput">
                        <option v-for="(value, key) in variable" v-bind:value="key">
                            {{ key }}: {{ value }}
                        </option>
          </select>
        </div>
      </div>
      <div class="clearfix">
        <button class="btn btn-info pull-right" v-on:click='ok'>确认</button>
      </div>
    </div>
    <div class="tab-pane" id="tab_4">
      <div class="form-group"> 
        <div class="col-sm-12">
          <textarea class="form-control" v-model="svgPath" 
          style="resize: none;height: 220px;"> 
          </textarea>
        </div>
      </div>
      <div class="clearfix">
        <button class="btn btn-info pull-right" v-on:click='ok'>确认</button>
      </div>
    </div>
  </div>
</div>