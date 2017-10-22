 <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content" v-if='data'>
     
        <DomTypeLine 
        v-if='data.cfg_type=="DOMTYPE_LINE"' 
        :$dom="$dom"
        :data="data"
        ></DomTypeLine>
        <DomTypeRect
        v-if='data.cfg_type=="DOMTYPE_RECT"' 
        :$dom="$dom"
        :data="data"
        ></DomTypeRect>
        <DomTypeCircle
        v-if='data.cfg_type=="DOMTYPE_CIRCLE"' 
        :$dom="$dom"
        :data="data"
        ></DomTypeCircle>
        <DomTypeEllipse
        v-if='data.cfg_type=="DOMTYPE_ELLIPSE"' 
        :$dom="$dom"
        :data="data"
        ></DomTypeEllipse>
        
        <DomTypeSvg
        v-if='data.cfg_type=="DOMTYPE_SVG"' 
        :$dom="$dom"
        :data="data"
        ></DomTypeSvg>
        <DomTypeTxt 
          v-if='data.cfg_type=="DOMTYPE_TXT"' 
          :$dom="$dom"
          :data="data"
        ></DomTypeTxt>
        <DomTypeIcon 
          v-if='data.cfg_type=="DOMTYPE_ICON"' 
          :$dom="$dom"
          :data="data"
        ></DomTypeIcon>
        <DomTypeEChartsGauge 
          v-if='data.cfg_type=="DOMTYPE_ECHARTSGAUGE"' 
          :$dom="$dom"
          :data="data"
        ></DomTypeEChartsGauge>
        <DomTypeEChartsLine 
          v-if='data.cfg_type=="DOMTYPE_ECHARTSLINE"' 
          :$dom="$dom"
          :data="data"
        ></DomTypeEChartsLine>
        
        <DomTypeImage 
          v-if='data.cfg_type=="DOMTYPE_IMAGE"' 
          :$dom="$dom"
          :data="data"
        ></DomTypeImage>
        
    </div>
  </div>
</div>