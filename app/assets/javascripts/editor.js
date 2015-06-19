function markdownEditor() {
  var markdownelement = document.querySelector(".editor > #markdown");
  var placeholder = $("#rich-text").data("placeholder");
  new MediumEditor(document.querySelector(".editor > #rich-text"), {
    buttons: ["bold", "italic", "orderedlist", "unorderedlist", "header1", "header2", "quote"],
    firstHeader: 'h4',
    secondHeader: 'h5',
    paste: {
        cleanPastedHTML: true,
        cleanAttrs: ['style', 'dir'],
        cleanTags: ['label', 'meta']
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

// Functions run when the document is "ready".
var ready = function() {
  markdownEditor();
  preventUnloadIfChanged();
};

$(document).ready(ready);
