<div class="ProjectCFGList ">
    <div class="dropdown">
        <span class="brand dropdown-toggle" type="button" id="cfg-project-list-menu" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <i class="brand-icon fa fa-windows" aria-hidden="true"></i>{{activeProName}}
        </span>
        <ul class="dropdown-menu" aria-labelledby="cfg-project-list-menu">
            <li v-for="item in proList" v-on:click=" jumpToProId(item)" v-bind:class="{'active':activeProId==item.ProjectId}">
                <a>
                    {{item.PName}}</a>
            </li>
        </ul>
    </div>
    <ul class="cfg-grid-group__component clearfix">
        <li class="cfg-grid-group__item" v-for="item in cfgList" v-bind:class="{'active':activeCfgId==item.id}">
            <div class="card">
                <span class="card__name">
                    {{item.cfgName}}
                </span>
                <div class="card_ctrlist">
                    <span v-on:click="delCfg(item)"> 删除</span>
                    <span v-on:click="modifyCfg(item)">修改</span>
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
</div>