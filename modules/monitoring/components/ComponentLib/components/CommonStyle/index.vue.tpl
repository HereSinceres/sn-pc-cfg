<div class="box box-cfgset  flat">
    <div class="box-header with-border">
        <h3 class="box-title">样式【公用】</h3>
        <div class="box-tools pull-right">
            <button type="button" class="btn btn-box-tool" v-on:click='ok'><i class="fa fa-check-circle-o"></i>
            </button>
        </div>
        <!-- /.box-tools -->
    </div>
    <!-- /.box-header -->
    <div class="box-body form-horizontal">
        <div class="form-group">
            <label class="col-sm-2 control-label">x</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" v-model='x'>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">y</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" v-model='y'>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">宽</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" v-model='w'>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">高</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" v-model='h'>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">旋转</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" v-model='rotate'>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">层级</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" v-model='zIndex'>
            </div>
        </div>
    </div>
</div>