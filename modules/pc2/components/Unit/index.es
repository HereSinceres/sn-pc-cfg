var $ = require('jquery');
var Draggable = require('lib/Draggable/Draggable.js');
require('lib/editable/Matrix.js')();
require('lib/editable/DragManager.js')();
require('lib/editable/ResizeManager.js')();
require('lib/editable/RotateManager.js')();
require('lib/editable/jquery.editable.js')();

var Base = require('modules/monitoring/Base.es'); 

function addEventAndAddDragAble() {  
    var $array = $('[data-equip-uuid]');
    for (var index = 0; index < $array.length; index++) {
        var element = $array[index]; 
       var editable= $(element).editable({
            resizable: true,
            rotatable: true,
            draggable: true,
        });
        console.log(editable);
    } 
}
function CallBack(para) {
    $('.J-unit').append(para.dom);
    addEventAndAddDragAble();
}

function init() {
    addEventAndAddDragAble();
    Base.eventEmitter.addListener(Base.CONST_EVENT_NAME.ADD_NEWUNIT, CallBack);
    Base.eventEmitter.addListener(Base.CONST_EVENT_NAME.MODIFY_UNIT_CONFIG, function (para) {
        // $dom:  this.ori$dom,
        // type: temp.type,
        // content: newContent
        console.log(para);
        switch (para.type) {
            case 'style': {
                para.$dom.attr('style', para.content);
                break;
            }
            default: {
                para.$dom.data(para.type, para.content);
                break;
            }
        }
    });
}
init();
