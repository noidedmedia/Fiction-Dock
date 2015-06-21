function CharacterListItem(character, container){
  console.log(container);
  this.character = character;
  this.container = container;
}

CharacterListItem.prototype.getItem = function(showFname, callback){
  var item = $("<li>");
  item.append(this.character.name);
  if(this.showFname){
    item.append($("<span>").append("(" + this.character.franchise.name + ")"));
  }
  item.append(this.removeButton(callback));
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
