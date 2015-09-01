
// Functions run when the document is "ready".
var ready = function() {
  // Only run when the editor is open.
  if ( document.querySelector('.editor textarea') ) {
    // Check for the Ctrl/⌘ key and "S" (equivalent to keyCode 83) being pressed, prevent save dialog.
    $(document).on('keydown', function(e) {
      if ((e.metaKey || (e.ctrlKey && !e.altKey)) && e.keyCode === 83) {
        e.preventDefault();
        return false;
      }
    });
  }  
};

$(document).ready(ready);
