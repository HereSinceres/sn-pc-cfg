<div class="nav-tabs-custom form-horizontal">
    <ul class="nav nav-tabs">
        <li class="active">
            <a href="#tab_1" data-toggle="tab">样式[公用]</a>
        </li>
        <li class="">
            <a href="#tab_2" data-toggle="tab">输入属性[公用]</a>
        </li>
        <li class="">
            <a href="#tab_3" data-toggle="tab">变量</a>
        </li>
        <li class="">
            <a href="#tab_4" data-toggle="tab">私有属性</a>
        </li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane active" id="tab_1">
            <CommonStyle :$dom="$dom" :data="data" :uuid="uuid"></CommonStyle>
        </div>
        <div class="tab-pane" id="tab_2">
            <CommonAttr :$dom="$dom" :data="data" :uuid="uuid"></CommonAttr>
        </div>
        <div class="tab-pane" id="tab_3">
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
                                    <input v-if="cal.attr=='color'" type="color" class="form-control" v-model="cal.value" :placeholder="cal.name">
                                    <input v-else type="text" class="form-control" v-model="cal.value" :placeholder="cal.name">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix">
                <button class="btn btn-info pull-right" v-on:click='ok'>确认</button>
            </div>
        </div>
        <div class="tab-pane" id="tab_4">
            <div class="form-group">
                <label class="col-sm-3 control-label">选择图标
          <i :class='icon'></i>:</label>
                <div class="col-sm-9">
                    <a class="btn" v-for='item in iconList' v-on:click='setIcon(item)'>
                        <i :class='item.iconName'></i>
                    </a>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label">字体大小</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" v-model='fontSize' placeholder="eg:12px">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label">颜色</label>
                <div class="col-sm-9">
                    <input type="color" class="form-control" v-model='color' placeholder="eg:red">
                </div>
            </div>
            <div class="clearfix">
                <button class="btn btn-info pull-right" v-on:click='ok'>确认</button>
            </div>
        </div>
    </div>
</div>