// DOMTYPE_TXT 类型  只读 或者  可读写
var Base = require('../../../Base.es');

require('../../../../lib/editable/Matrix.js')();
require('../../../../lib/editable/DragManager.js')();
require('../../../../lib/editable/ResizeManager.js')();
require('../../../../lib/editable/RotateManager.js')();
require('../../../../lib/editable/jquery.editable.js')(); 
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
        data-type="${this.type}"
        data-xxxx-uuid="J_uuid_${Base.uuid()}">1213</div>`;
        var html = $.parseHTML(str);

        $('.J-unit').append(html);
        // 广播渲染到画板事件
        Base.eventEmitter.emitEvent(Base.CONST_EVENT_NAME.ADD_NEWUNIT);
    }
    // 静态方法－添加拖动操作
    static addDragCtr($dom) {
        $dom.editable({
            resizable: true,
            rotatable: true,
            draggable: true
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
