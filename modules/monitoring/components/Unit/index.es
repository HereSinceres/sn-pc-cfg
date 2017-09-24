var $ = require('jquery');
var Base = require('modules/monitoring/Base.es');
var DOMTYPE_TXT = require('../ComponentLib/DOMTYPE_TXT/index.es');

function addEventAndAddDragAble() {
    var $array = $('[data-xxxx-uuid]');
    for (var index = 0; index < $array.length; index++) {
        var $el = $($array[index]);
        DOMTYPE_TXT.addDragCtr($el);
        $el.dblclick(() => {
            DOMTYPE_TXT.openDialogSet($el);
        });
    }
}
function CallBack() {
    addEventAndAddDragAble();
}

function init() {
    addEventAndAddDragAble();
    Base.eventEmitter.addListener(Base.CONST_EVENT_NAME.ADD_NEWUNIT, CallBack);
}
init();
