<div class="content-wrapper "> 
  <section class="tools-sider"> 
     <i class="fa fa-save" v-on:click='save'></i> 
  </section>
  <div class="content J-wrapper"  style="position:relative"></div>
  <div class="context-menu">
      <ul class="dropdown-menu" role="menu">
            <li><a tabindex="-1" v-on:click='del'>删除</a></li>
            <li><a tabindex="-1" v-on:click='set'>设置</a></li>
       
      </ul>
    </div>
</div>