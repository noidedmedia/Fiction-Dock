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
    container.attr({
      class: "character-checked"
    });
    toggle.attr({
      class: "character-list-action"
    }).append("Remove");
  }
  else{
    container.attr({
      class: "character-unchecked"
    });
    toggle.attr({
      class: "character-list-action character-unchecked"
    }).append("Add");
  }
  toggle.click(callback);
  container.append(toggle);
  container.append($("<div>").attr({
    class: "character-list-name"
  }).append(this.name));
  return container;
}
