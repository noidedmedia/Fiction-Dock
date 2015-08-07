function tabbedMenu() {
  console.log("test");

  $('ul[data-tabs="true"] li').click(function() {
    var tabid = $(this).attr('data-tab');
    console.log(tabid);

    $('ul[data-tabs="true"] li').removeClass('current');
    $('.tab-content').removeClass('current');
    $(this).addClass('current');
    $('.tc-' + tabid).addClass('current');
    var cb;
    // set cb in body of if statement for speed
    if(cb = $(".tc-" + tabid).data("callback")){
      console.log("Found callback on tab:",cb);
      // If we already ran the callback, don't do it again
      if($(".tc-" + tabid).data("callback_ran")){
        console.log("callback already ran");
        return;
      }
      console.log("callback hasn't ran, running it...");
      // Run the callback, passing the tab as an argument
      window[cb]($(".tc-"+tabid));
      $(".tc-"+tabid).data("callback_ran", true);
    }
  });
}

var ready = function() {
  tabbedMenu();
};

$(document).ready(ready);
