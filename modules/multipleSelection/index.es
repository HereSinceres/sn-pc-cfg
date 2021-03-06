var $document = $(document);

var $container = $('body');
var selectedClass = 'selected';

function getSelectableElements(element) {
  var out = [];
  var childs = element.children();
  for (var i = 0; i < childs.length; i++) {
    var $child = $(childs[i]);
    // DOM 过滤 
    if ($child.data().isselectable) {
      out.push($child);
    } else {
      out = out.concat(getSelectableElements($child));
    }
  }
  return out;
}
$(document).on('mousedown', function (event) {
  // Prevent default dragging of selected content
  event.preventDefault();
  if (event.which == 1) {
    var startX = event.pageX;
    var startY = event.pageY;
    var helper = $('<div></div>').addClass('select-helper');
    $document.find('body').append(helper);
    $document.on('mousemove', mousemove);
    $document.on('mouseup', mouseup);

    function transformBox(startX, startY, endX, endY) {

      var result = {};

      if (startX > endX) {
        result.beginX = endX;
        result.endX = startX;
      } else {
        result.beginX = startX;
        result.endX = endX;
      }
      if (startY > endY) {
        result.beginY = endY;
        result.endY = startY;
      } else {
        result.beginY = startY;
        result.endY = endY;
      }
      return result;
    }

    function moveSelectionHelper(hepler, startX, startY, endX, endY) {

      var box = transformBox(startX, startY, endX, endY);

      helper.css({
        "top": box.beginY + "px",
        "left": box.beginX + "px",
        "width": (box.endX - box.beginX) + "px",
        "height": (box.endY - box.beginY) + "px"
      });
    }

    function checkElementHitting(box1, box2) {
      return (box2.beginX <= box1.beginX && box1.beginX <= box2.endX || box1.beginX <= box2.beginX && box2.beginX <= box1.endX) &&
        (box2.beginY <= box1.beginY && box1.beginY <= box2.endY || box1.beginY <= box2.beginY && box2.beginY <= box1.endY);
    }

    function offset(element) {
      var documentElem,
        box = {
          top: 0,
          left: 0
        },
        doc = element && element.ownerDocument;
      documentElem = doc.documentElement;

      if (typeof element.getBoundingClientRect !== undefined) {
        box = element.getBoundingClientRect();
      }

      return {
        top: box.top + (window.pageYOffset || documentElem.scrollTop) - (documentElem.clientTop || 0),
        left: box.left + (window.pageXOffset || documentElem.scrollLeft) - (documentElem.clientLeft || 0)
      };
    }

    function removeSelectedStatus() {
      // 移除所有可选中的DOM
      var childs = getSelectableElements($container);
      for (var i = 0; i < childs.length; i++) {
        $(childs[i]).removeClass(selectedClass);
      }
    }

    function mousemove(event) {
      event.preventDefault();
      removeSelectedStatus();
      moveSelectionHelper(helper, startX, startY, event.pageX, event.pageY);

      var childs = getSelectableElements($container);
      for (var i = 0; i < childs.length; i++) {
        if (checkElementHitting(transformBox(offset(childs[i][0]).left, offset(childs[i][0]).top, offset(childs[i][0]).left + childs[i].prop('offsetWidth'), offset(childs[i][0]).top + childs[i].prop('offsetHeight')), transformBox(startX, startY, event.pageX, event.pageY))) {
          $(childs[i]).addClass(selectedClass);
        } else {
          $(childs[i]).removeClass(selectedClass);
        }
      }
    }

    function mouseup() {
      event.preventDefault();
      helper.remove();
      $document.off('mousemove', mousemove);
      $document.off('mouseup', mouseup);
    }
  }
})