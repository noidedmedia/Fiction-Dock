// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//
function Character(obj){
  for(var key in obj){
    this[key] = obj[key];
  }
}
/*
 * Returns a list item for display, with proper callbacks
 *
 * When checked, it will use `removeCharacter` on `c` to remove
 * a character.
 *
 * When checked=false, it will use `addCharacter` on `c` to add a
 * character.
 *
 * The callback `done` is run after either callback has finished.
 */
Character.prototype.formDisplay = function(checked, c, done){
  var container = $("<li>");
  var toggle = $("<div>");
  if(checked == true){
    container.attr({
      class: "character-checked"
    });
    toggle.attr({
      class: "character-list-action"
    }).append("Remove");
    toggle.click(this.removalCallback(c, done));
  }
  else{
    container.attr({
      class: "character-unchecked"
    });
    toggle.attr({
      class: "character-list-action character-unchecked"
    }).append("Add");
    toggle.click(this.additionCallback(c, done));
  }
  container.append(toggle);
  container.append($("<div>").attr({
    class: "character-list-name"
  }).append(this.name));
  return container;
}
Character.prototype.removalCallback = function(c, done){
  var that = this;
  return function(){
    c.removeCharacter(that);
    done();
  }
}
Character.prototype.additionCallback = function(c, done){
  var that = this;
  return function(){
    c.addCharacter(that);
    done();
  }
}
