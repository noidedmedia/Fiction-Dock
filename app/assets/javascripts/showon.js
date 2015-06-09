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
      $(toggle).toggleClass('active');

      // If the element being pressed has he class "tooltip", all other
      // open tooltips will be closed when the element is pressed.
      $(".tooltip").not(_this).removeClass('active');

      // This prevents "bubbling up" of the click event when it's within the
      // dialog, to prevent "clickoutside" from erroneously running the
      // active toggle function when the click is within the dialog.
      $(_this).bind("click", function(e) {
        e.stopPropagation();
      });

      // Binds a function to toggle the active/inactive classes on the dialog
      // to clicking outside the button that toggles the dialog.
      // Binding "clickoutside" to the dialog itself doesn't work, because
      // the toggle is technically outside the dialog and the dialog's
      // active classes are removed before it's able to display.
      $(toggle).bind("clickoutside", function() {
        $(_this).removeClass('active');
        $(toggle).removeClass('active');
        $(_this).unbind("clickoutside");
      });
    });
  });
};

var ready = function() {
  showon();
};

$(document).ready(ready);
