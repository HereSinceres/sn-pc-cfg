<div>
    <CommonStyle :uuid="uuid"></CommonStyle>
    <CommonAttr :uuid="uuid"></CommonAttr>
    <div class="box box-cfgset  flat">
        <div class="box-header with-border">
            <h3 class="box-title">自定义SVG</h3>
            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" v-on:click='ok'><i class="fa fa-check-circle-o"></i>
                            </button>
            </div>
        </div>
        <div class="box-body form-horizontal">
            <div class="form-group">
                <div class="col-sm-12">
                    <textarea class="form-control" v-model="svgPath" style="resize: none;height: 220px;"> 
                      </textarea>
                </div>
            </div>
        </div>
    </div>
</div>