function Character(obj){
  for(var key in obj) {
    this[key] = obj[key];
  }
}

/*
 * Return a <li> containing this character.
 * If `remove` is true, it will contain a button which calls
 * `removeCharacter` on the parent object. If it is false, it will
 * contained a button which calls `addCharacter` on the parent object.
 */
Character.prototype.displayItem = function(object, remove) {
  var item = $("<li>").addClass("character-list-item");
  item.append($("<div>").attr({
    class: "character-name"
  }).append(this.name));
  if(remove){
    item.append(this.removeButton(object));
  }
  else{
    item.append(this.addButton(object));
  }
}

Character.prototype.addButton = function(object) {

}

Character.prototype.removeButton = function(object) {

}
