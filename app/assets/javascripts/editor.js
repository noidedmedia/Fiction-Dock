function markdownEditor() {
  var markdownelement = document.querySelector(".editor > .markdown > pre");
  new MediumEditor(document.querySelector(".editor > .rich-text"), {
    buttons: ["bold", "italic", "underline", "orderedlist", "unorderedlist", "header1", "header2", "quote"],
    paste: {
        cleanPastedHTML: true,
        cleanAttrs: ['style', 'dir'],
        cleanTags: ['label', 'meta']
    },
    extensions: {
      markdown: new MeMarkdown(function (md) {
        markdownelement.innerText = md;
      })
    }
  });
}

// Functions run when the document is "ready".
var ready = function() {
  markdownEditor();
};

$(document).ready(ready);
