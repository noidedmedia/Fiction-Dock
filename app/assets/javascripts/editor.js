// Only run when the editor is open.
if ( document.querySelector('div[contenteditable="true"]') ) {
  // Check for the Ctrl/⌘ key and "S" (equivalent to keyCode 83) being pressed, prevent save dialog.
  $(document).on('keydown', function(e) {
    if ((e.metaKey || (e.ctrlKey && !e.altKey)) && e.keyCode === 83) {
      e.preventDefault();
      return false;
    }
  });
}

function preventUnloadIfChanged() {
  $("#rich-text").bind('input', function() {
    // Unbind it so it stops listening, we only need to detect one input to
    // determine that the text has been changed.
    $("#rich-text").unbind('input');

    // Declare "submitted" variable
    // Used to determine if the form is being submitted or not.
    var submitted = false;

    // ".onbeforeunload" is a function for when the page
    window.onbeforeunload = function() {
      // If the form is being submitted, the alert shouldn't be displayed.
      // Otherwise, display it.
      if (!submitted) {
        var alertmsg = $("#rich-text").data("onbeforeunload");
        return alertmsg;
      }
    }

    // When the form is submitted, the "submitted" variable is
    // changed to true to ensure that the alert message won't
    // be shown.
    $("form").submit(function() {
      submitted = true;
    });
  });
}

// Throttles function call.
// First variable is the function itself, second is the length
// of the "idle time" in milliseconds before the function will run.
// If the user is typing rapidly, the function won't be spammed
// constantly, but instead only run once the user finishes typing
// and doesn't begin again for another X milliseconds.
function throttle(fn, delay) {
  var timer = null;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

// Paste text as plaintext for Markdown Editor.
if ( document.querySelector('div[contenteditable="true"]') ) {
  document.querySelector('div[contenteditable="true"]').addEventListener("paste", function(e) {
    e.preventDefault();
    var text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  });
}

function htmlToMarkdown(elem) {
  var output = "";

  for (var x = 0; x < elem.childNodes.length; x++) {
    if (elem.childNodes[x].textContent) {
      output += elem.childNodes[x].textContent;
    } else {
      output += "\r\n";
    }
  }

  return(output);
}

function plainTextEditor() {
  $("#plain-text-contenteditable").on("input", throttle(function() {

    var markdownforsubmit = htmlToMarkdown( document.getElementById("plain-text-contenteditable") );

    $("#plain-text-textarea").text(markdownforsubmit);
  }, 500));
}


// Functions run when the document is "ready".
var ready = function() {
  preventUnloadIfChanged();
  plainTextEditor();
};

$(document).ready(ready);
