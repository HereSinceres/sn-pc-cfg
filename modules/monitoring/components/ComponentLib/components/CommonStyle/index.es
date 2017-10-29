var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var domUtil = require('modules/util/dom/domUtil.es');

module.exports = {
    props: ['uuid'],
    components: {},
    data: function () {
        return {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            rotate: 0,
            zIndex: 0,
            isShowCfgDialog: false,
            cfg_fix_num: -1
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        // 获取当前dom 的 x,y,w,h
        var target = $('[data-cfg-uuid=' + this.uuid + ']')[0];
        var $dom = $(target);
        this.x = (parseFloat(target.getAttribute('data-x')) || 0);
        this.y = (parseFloat(target.getAttribute('data-y')) || 0);
        this.w = (parseFloat(target.style.width) || target.clientWidth || 0);
        this.h = (parseFloat(target.style.height) || target.clientHeight || 0);
        this.rotate = domUtil.getRotationDegrees($(target));
        this.zIndex = target.style.zIndex;
        this.cfg_fix_num = $dom.attr('data-cfg_fix_num');
    },
    methods: {
        ok: function () {
            var target = $('[data-cfg-uuid=' + this.uuid + ']')[0];
            var $dom = $(target);
            // translate the element
            target.style.webkitTransform = target.style.transform = 'translate(' + this.x + 'px, ' + this.y + 'px)';
            // update the posiion attributes
            target.setAttribute('data-x', this.x);
            target.setAttribute('data-y', this.y);
            target.style.width = this.w + 'px';
            target.style.height = this.h + 'px';
            target.style.webkitTransform = target.style.transform += 'rotate(' + this.rotate + 'deg)';
            target.style.zIndex = this.zIndex;
            $dom.attr('data-cfg_fix_num', this.cfg_fix_num);

            $.notify({
                message: '保存成功'
            });
            this.toggleCfg(0);
        },
        toggleCfg: function (isShow) {
            this.isShowCfgDialog = isShow;
        }
    }
};