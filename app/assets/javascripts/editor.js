function mediumMarkdownEditor() {
  var markdownelement = document.querySelector(".editor > #markdown");
  var placeholder = $("#rich-text").data("placeholder");
  var anchorplaceholder = $("#rich-text").data("anchor-placeholder");
  new MediumEditor(document.querySelector(".editor > #rich-text"), {
    buttons: ["bold", "italic", "orderedlist", "unorderedlist", "header1", "header2", "quote", "anchor"],
    buttonLabels: {
      "quote": '<span class="icon icon-quote"></span>',
      "anchor": '<span class="icon icon-link"></span>'
    },
    firstHeader: 'h1',
    secondHeader: 'h2',
    autoLink: true,
    anchorPreview: {
      hideDelay: 400
    },
    paste: {
      cleanPastedHTML: true,
      cleanAttrs: ['class', 'style', 'dir'],
      cleanTags: ['label', 'meta', 'span']
    },
    placeholder: {
      text: placeholder
    },
    imageDragging: false,
    disableDoubleReturn: true,
    extensions: {
      markdown: new MeMarkdown(function (md) {
        markdownelement.innerHTML = md;
      })
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
  mediumMarkdownEditor();
  preventUnloadIfChanged();
  plainTextEditor();
};

$(document).ready(ready);
