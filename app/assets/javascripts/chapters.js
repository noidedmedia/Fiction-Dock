$(function(){
  var chapterbox = $(".chapter-body")[0];
  if(! chapterbox){
    return;
  }
  function callback(){
    var percent = $(window).scrollTop() / ($(chapterbox).height() - $(window).height());
    if(percent > 0.5 && ! callback.ran){
      // scrolled 50%
      console.log("marking story as read");
      $.post(window.location.href + "/read");
      callback.ran = true;
    }
  };
  $(window).scroll(callback);
  callback(); // call once in case we can't scroll or don't need to
});
