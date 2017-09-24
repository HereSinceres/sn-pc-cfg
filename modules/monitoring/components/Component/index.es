var $ = require('jquery');
var Base = require('modules/monitoring/Base.es'); 
var DomTypeTxt = require('../ComponentLib/DOMTYPE_TXT/index.es'); 
var $top = $('.J-components');
var $container = $top.find('.J-container');
var $open =  $top.find('.J-btn-open');
var $close = $top.find('.J-btn-close');
var domTypeTxt = new DomTypeTxt();
function run() {
    console.log(domTypeTxt.renderComponent());
    $container.append(domTypeTxt.renderComponent());
    $container.append(domTypeTxt.renderComponent()); 
    $open.click(function () {
        debugger
        $container.show();
    });
    $close.click(function () {
        $container.hide();
    });
}
run();
