// DOMTYPE_TXT 类型  只读 或者  可读写
var Base = require('../../../Base.es');
 
var interact = require('../../../../lib/interact/interact.js');
console.log(interact);
class DomTxt {
    constructor() {
        this.type = Base.CONST_DOM_TYPE.DOMTYPE_TXT;
    }
    // 渲染到组件库
    renderComponent() {
        var str = `<div 
                data-type="${this.type}"
                data-uuid="J_uuid_${Base.uuid()}">1213</div>`;
        var html = $.parseHTML(str);
        $(html).click(() => {
            this._renderToPaint();
        });
        return html;
    }
    // 渲染到画板
    _renderToPaint() {
        var str = `<div 
        class='u-drag'
        data-type="${this.type}"
        data-xxxx-uuid="J_uuid_${Base.uuid()}">1213</div>`;
        var html = $.parseHTML(str);

        $('.J-unit').append(html);
        // 广播渲染到画板事件
        Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.ADD_NEWUNIT);
    }
    // 静态方法－添加拖动操作
    static addDragCtr($dom) { 
        interact($dom[0])
            .draggable({
                onmove:function (event) {
                    var target = event.target,
                        // keep the dragged position in the data-x/data-y attributes
                        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                
                    // translate the element
                    target.style.webkitTransform =
                    target.style.transform =
                      'translate(' + x + 'px, ' + y + 'px)';
                
                    // update the posiion attributes
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                  }
            })
            .resizable({
                preserveAspectRatio: true,
                edges: {left: true, right: true, bottom: true, top: true}
            })
            .on('resizemove', function (event) {
                var target = event.target;
                var x = (parseFloat(target.getAttribute('data-x')) || 0);
                var y = (parseFloat(target.getAttribute('data-y')) || 0);
                // update the element's style
                target.style.width = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';
                // translate when resizing from top or left edges
                x += event.deltaRect.left;
                y += event.deltaRect.top;
                target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)';
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
                // target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
            });
    }
    // 静态方法－渲染弹窗Set
    static openDialogSet($dom) {
        console.log($dom);
    }
    // 执行监控回调方法
    static monitorCallBack($dom) {
        // 遍历界面所有元素
        // 如果为当前类型
        // 监控数据源 执行绑定数据
        // 绑定事件
    }
}
module.exports = DomTxt;
