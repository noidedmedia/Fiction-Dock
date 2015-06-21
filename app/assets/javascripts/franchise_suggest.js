function FranchiseSuggest(container){
  this.container = container;
}

FranchiseSuggest.prototype.toggleButton = function(){
  var that = this;
  var btn = $("<button>").attr({
    class: "franchise-toggle-button"
  });
  btn.append("Add a Franchise");
  btn.click(function(){
    console.log("Add a franchise button clicked");
    btn.replaceWith(that.display);
  });
  return btn;
}
FranchiseSuggest.prototype.display = function(){

}
