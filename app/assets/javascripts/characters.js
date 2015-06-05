// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//
function Character(obj){
  for(var key in obj){
    this[key] = obj[key];
  }
}

Character.prototype.formDisplay = function(checked, callback){
  var container = $("<li>");
  var toggle = $("<div>");
  if(checked == true){
    toggle.attr({
      class: "character-list-action character-checked"
    }).append("Remove");
  }
  else{
    toggle.attr({
      class: "character-list-action character-unchecked"
    }).append("Add");
  }
  container.append(toggle);
  container.append($("<div>").attr({
    class: "character-list-name"
  }).append(this.name));
  return container;
}
