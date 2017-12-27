<div class="ProjectCFGList ">
    <div class="ProjectCFGList_header">
        <img  class="ProjectCFGList_headerLogo" src='../../picLib/logo.png'>
        </img>
        <div class="dropdown">
            <span class="brand dropdown-toggle" type="button" id="cfg-project-list-menu" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                <i class="brand-icon fa fa-windows" aria-hidden="true"></i>{{activeProName}}
            </span>
            <ul class="dropdown-menu" aria-labelledby="cfg-project-list-menu">
                <li v-for="item in MessageList" v-on:click=" jumpToProId(item)" v-bind:class="{'active':activeProId==item.ProjectId}">
                    <a>
                        {{item.PName}}
                    </a>
                </li>
            </ul>
        </div>
        
        <div class="dropdown headDropdown">
            <img :src="userInfo.sysUserAvatar" alt="" class="dropdown-toggle" id="cfg-project-list-menu" data-toggle="dropdown" aria-haspopup="true"  aria-expanded="false">
            
                <dl class="dropdown-menu" >
                    <dt @click="userInformation" style="cursor:pointer;">
                        <h5><img :src='userInfo.sysUserAvatar' alt=""></h5>
                        <h4>
                            <p class="visitor"><span>【{{userInfo.sysUserType}}】</span>
                            <button class="button_primary" type="primary" size="mini" v-if="userInfo.sysUserState=='注册'||userInfo.sysUserState=='拒绝'">未认证</button>
                            <button class="button_primary" type="primary" size="mini" v-if="userInfo.sysUserState=='提交'" style="background:#F9263E;border:#F9263E;">已提交</button>
                            <button class="button_success" type="success" size="mini" v-if="userInfo.sysUserState=='认证'">已认证</button>
                            
                            <p>名称 : {{userInfo.sysUserName}}</p>
                            <p>账号 : {{userInfo.sysName}}</p>
                        </h4>
                    </dt>
                    <dd>
                        <!-- <a href="javascript:void(0);" @click="userInformation">用户资料</a> -->
                        <a href="javascript:void(0);" @click="help">帮助</a>
                        <a href="javascript:void(0);"  @click="logout">退出</a>
                    </dd>
                </dl>
            
        </div>
        <div class="dropdown headDropdown">
            <img :src="userInfo.sysUserAvatar" alt="" class="dropdown-toggle" id="cfg-project-list-menu" data-toggle="dropdown" aria-haspopup="true"  aria-expanded="false">
            <ul class="dropdown-menu">
                <li v-for="item in proList" v-on:click=" jumpToProId(item)" v-bind:class="{'active':activeProId==item.ProjectId}">
                    <a>
                        {{item.PName}}
                    </a>
                </li>
            </ul>
        </div>
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