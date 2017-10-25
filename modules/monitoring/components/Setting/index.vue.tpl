<div v-if='data'>
    <DomTypeLine v-if='data.cfg_type=="DOMTYPE_LINE"' :$dom="$dom" :data="data" :uuid="uuid"></DomTypeLine>
    <DomTypeRect v-if='data.cfg_type=="DOMTYPE_RECT"' :$dom="$dom" :data="data" :uuid="uuid"></DomTypeRect>
    <DomTypeCircle v-if='data.cfg_type=="DOMTYPE_CIRCLE"' :$dom="$dom" :data="data" :uuid="uuid"></DomTypeCircle>
    <DomTypeEllipse v-if='data.cfg_type=="DOMTYPE_ELLIPSE"' :$dom="$dom" :data="data" :uuid="uuid"></DomTypeEllipse>
    <DomTypeSvg v-if='data.cfg_type=="DOMTYPE_SVG"' :$dom="$dom" :data="data" :uuid="uuid"></DomTypeSvg>
    <DomTypeTxt v-if='data.cfg_type=="DOMTYPE_TXT"' :$dom="$dom" :data="data" :uuid="uuid"></DomTypeTxt>
    <DomTypeIcon v-if='data.cfg_type=="DOMTYPE_ICON"' :$dom="$dom" :data="data" :uuid="uuid"></DomTypeIcon>
    <DomTypeEChartsGauge v-if='data.cfg_type=="DOMTYPE_ECHARTSGAUGE"' :$dom="$dom" :data="data" :uuid="uuid"></DomTypeEChartsGauge>
    <DomTypeEChartsLine v-if='data.cfg_type=="DOMTYPE_ECHARTSLINE"' :$dom="$dom" :data="data" :uuid="uuid"></DomTypeEChartsLine>
    <DomTypeImage v-if='data.cfg_type=="DOMTYPE_IMAGE"' :$dom="$dom" :data="data" :uuid="uuid"></DomTypeImage>
</div>