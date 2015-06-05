// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//
function Character(obj){
  for(var key in obj){
    this[key] = obj[key];
  }
}

Character.prototype.formDisplay = function(checked, form){
  var container = $("<li>");
  var toggle = $("<div>");
  if(checked == true){
    container.attr({
      class: "character-checked"
    });
    toggle.attr({
      class: "character-list-action"
    }).append("Remove");
    toggle.click(this.removeFromFormCallback(form));
  }
  else{
    container.attr({
      class: "character-unchecked"
    });
    toggle.attr({
      class: "character-list-action character-unchecked"
    }).append("Add");
    toggle.click(this.addToFormCallback(form));
  }
  container.append(toggle);
  container.append($("<div>").attr({
    class: "character-list-name"
  }).append(this.name));
  return container;
}
Character.prototype.removeFromFormCallback = function(form){
  console.log("Generating a form removal callback");
  console.log(this);
  var that = this;
  return function(){
    console.log("Removing from form!");
    for(var c in form.story.characters){
      if(form.story.characters[c].id == that.id){
        form.story.characters.splice(c, 1);
      }
    }
    form.render();
  }
}
Character.prototype.addToFormCallback = function(form){
  var that = this;
  return function(){
    form.story.addCharacter(that);
    form.render();
  }
}
