var hasread = false
var scrollHandle = function(event){
  console.log("handling scroll");
  if(hasread) return;
  var jq = $(".chapter-body")[0];
  console.log(jq);
  var max = jq.scrollHeight - jq.clientHeight;
  var percent = jq.scrollTop / max;
  console.log("max:", max, "percent", percent);
  if(percent > 0.75 && ! hasread){
    console.log("scrolled!");
    hasread = true;
  }
};

window.setInterval(scrollHandle, 1000);
