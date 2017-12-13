<div class="ProjectCFGList ">
    <div class="dropdown">
        <span class="brand dropdown-toggle" type="button" id="cfg-project-list-menu" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <i class="brand-icon fa fa-windows" aria-hidden="true"></i>{{activeProName}}
        </span>
        <ul class="dropdown-menu" aria-labelledby="cfg-project-list-menu">
            <li v-for="item in proList" v-on:click=" jumpToProId(item)" v-bind:class="{'active':activeProId==item.ProjectId}">
                <a>
                    {{item.PName}}
                </a>
            </li>
        </ul>
    </div>
    <ul class="cfg-grid-group__component clearfix">
        <li class="cfg-grid-group__item" v-for="item in cfgList" v-bind:class="{'active':activeCfgId==item.id}">
            <div class="card">
                <span class="card__name">
                    {{item.cfgName}}
                </span>
                <router-link :to="{ name: 'CfgOnlineByProId', params: { proId: item.proId }}" class="card__sethome pull-right " v-if='item.tag==1'>
                    <i class="fa fa-home "></i>
                </router-link>
                <div class="card_ctrlist">
                    <span v-on:click="sethome(item)"> 设置为主页</span>
                    <span v-on:click="delCfg(item)"> 删除</span>
                    <span v-on:click="modifyCfg(item)">修改</span>
                    <span v-on:click="copy(item)">复制</span>
                    <router-link :to="{ name: 'cfg', params: { cfgId: item.id }}">
                        编辑
                    </router-link>
                    <router-link :to="{ name: 'CfgOnline', params: { cfgId: item.id }}">
                        在线
                    </router-link>
                </div>
            </div>
        </li>
        <li class="cfg-grid-group__item" v-on:click="addCfg()">
            <div class="card ">
                <span class="card__add">
                    <i class="fa fa-plus-circle fa-4" aria-hidden="true"></i>
                </span>
            </div>
        </li>
    </ul>

    <div class="modal flat fade in" style="display:block;" v-if="isShowCopyDialog">
        <div class="modal-dialog modal-dialog--cfg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" v-on:click="isShowCopyDialog=0">
                        <span>×</span>
                    </button>
                    <h4 class="modal-title">Copy From</h4>
                </div>
                <div class="modal-body form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">项目</label>
                        <div class="col-sm-10">
                            <select class="form-control" v-model='copyProId' v-on:change="selectCopyProId">
                                <option v-for="option in proList" v-bind:value="option.ProjectId">
                                    {{ option.PName }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">组态配置</label>
                        <div class="col-sm-10">
                            <select class="form-control" v-model='copyCfg'>
                                <option v-for="option in copyCfgList" v-bind:value="option">
                                    {{ option.cfgName }}
                                </option>
                            </select>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info " v-on:click="copyOk()">保存</button>
                </div>
            </div>
        </div>
    </div>
</div>