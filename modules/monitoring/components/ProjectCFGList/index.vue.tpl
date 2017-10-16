<div class="ProjectCFGList">
  <span class="ProjectCFGList__menu" v-on:click="toggleIsShowPro">
    <i class="fa fa-bars"></i>
  </span>
  <ul class="sidebar-menu  ProjectCFGList__list" v-if="isShowPro">
    <li v-for="item in proList" v-on:click="jumpPro(item)">
      <a href="#">
        <i class="fa fa-files-o"></i>
        <span>{{item.PName}}</span>
      </a>
    </li>
  </ul>
  <ul class="sidebar-menu  ProjectCFGList__list" v-if="isShowCfg">
    <li>
      <a href="#">
        <i class="fa fa-plus" v-on:click='addCfg'></i>
      </a>
    </li>
    <li v-for="item in cfgList" v-on:click="jump(item)">
      <a href="#">
        <i class="fa fa-files-o"></i>
        <span>{{item.cfgName}}</span>
      </a>
    </li>
  </ul>
</div>