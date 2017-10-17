<div class="content-wrapper ">
  <section class="tools-sider">
    <i class="fa fa-save" v-on:click='saveDraft'>预览</i>
    <i class="fa fa-pen" v-on:click="toggleCanvasSet(1)">画布设置</i>
  </section>
  <div class="modal fade in" style="display:block;" v-if="isShowCanvasSetDialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" v-on:click="toggleCanvasSet(0)">
            <span>×</span>
          </button>
          <h4 class="modal-title">画布设置</h4>
        </div>
        <div class="modal-body form-horizontal">
          <div class="form-group">
            <label class="col-sm-2 control-label">宽</label>
            <div class="col-sm-4">
              <input type="number" class="form-control" v-model='canvas.w'>
            </div>
            <label class="col-sm-2 control-label">高</label>
            <div class="col-sm-4">
              <input type="number" class="form-control" v-model='canvas.h'>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">背景颜色</label>
            <div class="col-sm-4">
              <input type="color" class="form-control" v-model='canvas.bg'>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-info " v-on:click="savePaintSet()">保存</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <div class="content J-wrapper" style="position:relative"></div>
  <div class="context-menu">
    <ul class="dropdown-menu" role="menu">
      <li>
        <a tabindex="-1" v-on:click='del'>删除</a>
      </li>
      <li>
        <a tabindex="-1" v-on:click='set'>设置</a>
      </li>
      <li>
        <a tabindex="-1" v-on:click='copy'>复制</a>
      </li>

    </ul>
  </div>
</div>