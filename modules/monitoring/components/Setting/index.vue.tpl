<div v-if='data'>
    <DomTypeLine v-if='data.cfg_type=="DOMTYPE_LINE"' :uuid="uuid"></DomTypeLine>
    <DomTypeSimpleShape v-if='data.cfg_type=="DOMTYPE_SIMPLESHAPE"' :uuid="uuid"></DomTypeSimpleShape> 
    <DomTypeSvg v-if='data.cfg_type=="DOMTYPE_SVG"' :uuid="uuid"></DomTypeSvg>
    <DomTypeTxt v-if='data.cfg_type=="DOMTYPE_TXT"' :uuid="uuid"></DomTypeTxt>
    <DomTypeIcon v-if='data.cfg_type=="DOMTYPE_ICON"' :uuid="uuid"></DomTypeIcon>
    <DomTypeEChartsGauge v-if='data.cfg_type=="DOMTYPE_ECHARTSGAUGE"' :uuid="uuid"></DomTypeEChartsGauge>
    <DomTypeEChartsLine v-if='data.cfg_type=="DOMTYPE_ECHARTSLINE"' :uuid="uuid"></DomTypeEChartsLine>
    <DomTypeImage v-if='data.cfg_type=="DOMTYPE_IMAGE"' :uuid="uuid"></DomTypeImage>
</div>