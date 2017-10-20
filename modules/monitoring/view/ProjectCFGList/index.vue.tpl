<div class="ProjectCFGList ">

  <div class="dropdown">
    <span class="brand dropdown-toggle" type="button" id="cfg-project-list-menu" data-toggle="dropdown" aria-haspopup="true"
      aria-expanded="false">
      <i class="brand-icon fa fa-windows" aria-hidden="true"></i>{{activeProName}}
    </span>
    <ul class="dropdown-menu" aria-labelledby="cfg-project-list-menu">
      <li v-for="item in proList" v-on:click=" getCfgListByProId(item)" v-bind:class="{'active':activeProId==item.ProjectId}">
        <a>
          {{item.PName}}</a>
      </li>
    </ul>
  </div>
  <ul class="cfg-grid-group__component clearfix">
    <li class="cfg-grid-group__item" v-for="item in cfgList" v-on:click="jump(item)" v-bind:class="{'active':activeCfgId==item.id}">
      <div class="card">
        <span class="card__name">
          {{item.cfgName}}
          <i class="fa fa-trash " v-on:click="delCfg(item)"></i>
          <i class="fa fa-pencil " v-on:click="modifyCfg(item)"></i>
          <i class="fa fa-cogs" v-on:click="editCfg(item)"></i>
          <i class="fa fa-cog" aria-hidden="true"></i>
          <router-link :to="{ name: 'cfg', params: { cfgId: item.id }}">
            <i class="fa fa-eye"></i>
          </router-link>
          <router-link :to="{ name: 'CfgOnline', params: { cfgId: item.id }}">
              <i class="fa fa-eye"></i>线上
            </router-link>
          
        </span>
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