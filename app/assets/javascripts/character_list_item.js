function CharacterListItem(character, container, remove){
  console.log(container);
  this.character = character;
  this.container = container;
  this.remove = remove;
}

CharacterListItem.prototype.getItem = function(showFname, callback){
  var item = $("<li>");
  item.append(this.character.name);
  if(this.showFname){
    item.append($("<span>").append("(" + this.character.franchise.name + ")"));
  }
  if(this.remove){
    item.append(this.removeButton(callback));
  }
  else{
    item.append(this.addButton(callback));
  }
  return item;
}

CharacterListItem.prototype.removeButton = function(callback){
  var btn = $("<span>").attr({
    class: "character-remove-button"
  });
  btn.append("X");
  var that = this;
  btn.click(function(){
    that.container.removeCharacter(that.character);
    callback();
  });
  return btn;
}

CharacterListItem.prototype.addButton = function(callback){
  var btn = $("<span>").attr({
    class: "character-add-button"
  });
  btn.append("+");
  var that = this;
  btn.click(function(){
    that.container.addCharacter(that.character);
    callback();
  });
  return btn;
}
