function SearchControls(container){
  this.container = $(container);
}
SearchControls.prototype.takeControl = function(){
  this.container.html("Control aquired.");
  this.story = new Story({});
  this.addSubmitButton();
}

SearchControls.prototype.addSubmitButton = function(){
  var that = this;
  var btn = $("<button>");
  btn.click(function(){
    that.submit();
  });
  btn.append("Search");
  this.container.append(btn);
}
SearchControls.prototype.submit = function(){
  console.log("story is");
  console.log(this.story);
  var submitobj = {};
  var jsonstr = JSON.stringify(this.story);
  window.location.href = "/stories/search?json=" encodeURIComponent(jsonstr);
}
$(function(){
  var d;
  if(d = document.getElementById("searchControls"))
  { 
    console.log("On search page. Setting up controls...");
    var control = new SearchControls(d);
    control.takeControl();
  } 
});
