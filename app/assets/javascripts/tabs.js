function tabbedMenu() {
  console.log("test");

  $('ul[data-tabs="true"] li').click(function() {
    var tabid = $(this).attr('data-tab');
    console.log(tabid);

    $('ul[data-tabs="true"] li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $('.tc-' + tabid).addClass('current');
  });
}

var ready = function() {
  tabbedMenu();
};

$(document).ready(ready);
