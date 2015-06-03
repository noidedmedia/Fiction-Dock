function darkModeCookie() {
  var darkmodecookie = Cookies.get('darkmode');

  // If the user hasn't visited the site before, and the cookie is therefore undefined
  // we give the cookie a value of false, as dark mode isn't default.
  if ( darkmodecookie == undefined ) {
    Cookies.set('darkmode', 'false');
  }

  if (darkmodecookie == "true") {
    $("body").addClass("dark-mode");
  } else if (darkmodecookie !== "true") {
    $("body").removeClass("dark-mode");
  }
}

function darkModeToggle() {

  $("#dark-mode-toggle").on("click", function() {

    var darkmodecookie = Cookies.get('darkmode');

    if (darkmodecookie == "true") {
      
      $("body").removeClass("dark-mode");
      Cookies.set('darkmode', 'false');
  
    } else if (darkmodecookie !== "true") {
      
      $("body").addClass("dark-mode");
      Cookies.set('darkmode', 'true');
    }
  });
}

// Functions run when the document is "ready".
var ready = function() {
  darkModeCookie();
  darkModeToggle();
};

$(document).ready(ready);
