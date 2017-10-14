<div>
  <link rel="import" href="modules/monitoring/components/Header/index.html?__inline">
  <div class="content-wrapper ">
    <div class="content">
      <textarea class="col-sm-6" style="min-height:520px;" v-model="variable"></textarea>
      <pre class="col-sm-6 J-mock-format" style="min-height:520px;"></pre>
      <section class="tools-sider">
        <i class="fa fa-save" v-on:click="save" title="保存"></i>
        <i class="fa fa-retweet" v-on:click="format" title="格式化"></i>
      </section>
    </div>
  </div>
</div>