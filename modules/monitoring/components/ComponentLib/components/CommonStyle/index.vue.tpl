<div >
  <div class="form-group">
    <label class="col-sm-2 control-label">x</label>
    <div class="col-sm-4">
      <input type="number" class="form-control" v-model='x'>
    </div>
    <label class="col-sm-2 control-label">y</label>
    <div class="col-sm-4">
      <input type="number" class="form-control" v-model='y'>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">宽</label>
    <div class="col-sm-4">
      <input type="number" class="form-control" v-model='w'>
    </div>
    <label class="col-sm-2 control-label">高</label>
    <div class="col-sm-4">
      <input type="number" class="form-control" v-model='h'>
    </div>
  </div>
  <div class="form-group">
      <label class="col-sm-2 control-label">旋转</label>
      <div class="col-sm-4">
        <input type="number" class="form-control" v-model='rotate'>
      </div> 
      <label class="col-sm-2 control-label">层级</label>
      <div class="col-sm-4">
        <input type="number" class="form-control" v-model='zIndex'>
      </div> 
  </div>
  <div class="clearfix"> 
        <button class="btn btn-info pull-right" v-on:click='ok'>确认</button> 
  </div>
</div>