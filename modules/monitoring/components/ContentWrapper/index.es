var comlib = require('modules/monitoring/components/ComponentLib/index.es');
var interact = require('modules/lib/interact/interact.js');
var Base = require('modules/monitoring/Base.es');
var proStorage = require('modules/monitoring/dataService/proset.es');

module.exports = {
    components: {},
    data: function () {
        return {
            comlib: comlib,
            rightClickDom: null
        };
    },
    watch: {

    },
    template: __inline('./index.vue.tpl'),
    mounted: function () {
        var self = this;

        function callBack(item) {
            console.log(item);
            var html = item.renderToPaintDom();
            var $html = $.parseHTML(html);
            // 添加dom to paint 

            $(self.$el).find('.J-wrapper').append($html);
            // 绑定拖拽事件
            item.bindDragEvent($html[0]);
            // 添加弹窗事件
            item.bindOpenSetEvent($html[0]);
            self.bindRightClickEvent();
        }
        Base.eventEmitter.addListener(Base.CONST_EVENT_NAME.ADD_NEWUNIT, callBack);

        // 初始化项目
        self.init();
        self.bindRightClickEvent();

    },
    methods: {

        init: function () {
            var self = this;
            $(self.$el).find('.J-wrapper').append(proStorage.getItem());
            $(self.$el).find('[data-cfg-uuid]').each(function () {
                var eleDom = this;
                var data = $(eleDom).data();
                comlib.forEach(function (element) {
                    if (data.cfg_type === element.type) {
                        // 绑定拖拽事件
                        element.bindDragEvent(eleDom);
                        // 添加弹窗事件
                        element.bindOpenSetEvent(eleDom);
                    }

                }, this);
            });
        },
        save: function () {
            proStorage.setItem($(this.$el).find('.J-wrapper').html());
            $.notify({
                message: '保存成功'
            });
        },
        bindRightClickEvent: function () {
            var self = this;
            $('.u-drag').contextmenu({
                target: '.context-menu',
                before: function (e) {
                    self.rightClickDom = e.target;
                    e.preventDefault();
                    e.stopPropagation();
                    return true;
                }
            });
        },
        del: function () {
            if (this.rightClickDom) {
                if ($(this.rightClickDom).hasClass('u-drag')) {
                    $(this.rightClickDom).remove();
                }
                else {
                    $(this.rightClickDom).closest('.u-drag').remove();
                }
            }

        },
        set: function () {
            // 模拟点击双击，当前功能可不用
            $(this.rightClickDom).dblclick();
        }
    }
};
