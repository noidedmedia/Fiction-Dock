// A simple library to do a lot of things in-place with AJAX.
// Commented heavily so as to properly explain how it works.

/*
 *  The show-on property hides a DOM node until another node is clicked.
 *  To use, simply set the data-showon attribute with the Jquery selector
 *  for the node which will show whatever is initially hidden. 
 */
var showon = function() {
  var showondiv = $("div").filter(function(index) {
    return $(this).data("showon");
    // Elements with data in the "showon" property are hidden from the start,
    // appearing only when the selector specified by showon is clicked
  });
  showondiv.each(function() {
    var _this = this;
    $(_this).removeClass('active');
    
    // "data-showon" should have a value with the name (e.g. class or id) of
    // the button that toggles the element with the "data-showon" property.
    // The following line sets "toggle" equal to a jQuery selector for said
    // value.
    var toggle = $( $(_this).data("showon") );

    $(toggle).on("click", function() {
      $(_this).toggleClass('active');

      // If the element being pressed is has he class "tooltip", all other
      // open tooltips will be closed when the element is pressed.
      $(".tooltip").not(_this).removeClass('active');
    });
  });
};

var ready = function() {
  showon();
};

$(document).ready(ready);
