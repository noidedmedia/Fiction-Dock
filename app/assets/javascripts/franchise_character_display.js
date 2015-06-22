function FranchiseCharacterDisplay(franchise, container){
  this.franchise = franchise;
  this.container = container;
}

FranchiseCharacterDisplay.prototype.getBox = function(){
  this.box = $("<div>").attr({
    class: "franchise-container"
  });
  return this.box;
}
FranchiseCharacterDisplay.prototype.render = function(){
  this.box.empty();
  this.box.append($("<p>").append(this.franchise.name));
  var list = $("<ul>");
  var contained = this.container.characters.filter(function(char){
    if(char.franchise_id == this.franchise.id){
      return true
    }
    else{
      return false;
    }
  }, this);
  contained.forEach(function(member){
    var that = this;
    var d = new CharacterListItem(member, this.container);
    list.append(d.getItem(false, function(){
      that.render();
    }));
  }, this);
  this.box.append(list);
  this.box.append(this.newCharacterButton());
}

FranchiseCharacterDisplay.prototype.newCharacterButton = function(){
  console.log("Getting the new character button");
  var that = this;
  var btn = $("<button>").append("Add a character");
  btn.click(function(){
    btn.replaceWith(that.newCharacterList());
  });
  return btn;
}
FranchiseCharacterDisplay.prototype.newCharacterList = function(){
  var list = $("<ul>").attr({class: "new-character-list"});
  this.charactersNotInContainer().forEach(function(char){
    var that = this;
    var item = $("<li>");
    item.append(char.name);
    item.click(function(){
      that.container.addCharacter(char);
      that.render();
    });
    list.append(item);
  },this);
  return list;
}
FranchiseCharacterDisplay.prototype.charactersNotInContainer = function(){
var newChars = this.franchise.characters.filter(function(char){
    return this.container.characters.indexOf(char) == -1;
  }, this);
  console.log("Characters not in story:");
  console.log(newChars);
  return newChars;
}
