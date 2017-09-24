
var $ = require('jquery');
var $open = $('.J-mock-btn-open');
var $close = $('.J-mock-btn-close');
var $container = $('.J-mock-container');
var store = {
    Par1: 2,
    Par2: 3
}

function bindEvent() {
    $('.J-execute').click(() => {
        store = JSON.parse($('.J-mock-data').val());
        var uuid = (function (domId, haha) {
            console.log(domId, haha);
        });
        // 获取界面所有 data-uuid
        // 如果有 data-js 执行js f
        var array = $('[data-equip-uuid]');
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            if ($(element).data('js')) {
                var uuid = $(element).data('equip-uuid');
                var $dom = $(element);
                var uuidCallBackFun = 'var ' + uuid + ' =' + $(element).data('js') + ';' + uuid + '($dom)';
                console.log(uuidCallBackFun);
                eval(uuidCallBackFun);
            }
        }
    });
    $open.click(function () {
        $container.show();
    });
    $close.click(function () {
        $container.hide();
    });
}

function init() {
    $('.J-mock-data').val(JSON.stringify(store));
    bindEvent();
}
init();