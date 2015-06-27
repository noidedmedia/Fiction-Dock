function FranchiseCharacterDisplay(franchise, container, parent){
  this.franchise = franchise;
  this.container = container;
  this.parent = parent;
}

FranchiseCharacterDisplay.prototype.getBox = function(){
  this.box = $("<div>").attr({
    class: "franchise-container"
  });
  return this.box;
};

FranchiseCharacterDisplay.prototype.render = function(){
  var that = this;
  this.box.empty();
  this.box.append($("<p>").append(this.franchise.name));
  this.box.append(this.removeButton());
  var list = $("<ul>");
  var contained = this.container.characters.filter(function(char){
    if(char.franchise_id == this.franchise.id){
      return true;
    }
    else{
      return false;
    }
  }, this);
  contained.forEach(function(member){
    var d = new CharacterListItem(member, this.container, true);
    list.append(d.getItem(false, function(){
      that.render();
    }));
  }, this);
  this.box.append(list);
  this.box.append(Character.newCharacterButton(this.container,
        this.charactersNotInContainer(),
        false,
        function(){
          that.render();
          if(that.parent.renderShips){
            that.parent.renderShips();
          }
        }));
};
FranchiseCharacterDisplay.prototype.charactersNotInContainer = function(){
  var newChars = this.franchise.characters.filter(function(char){
    return this.container.characters.indexOf(char) == -1;
  }, this);

  return newChars;
};

FranchiseCharacterDisplay.prototype.removeButton = function(){
  var that = this;
  var btn = $("<button>");
  btn.click(function(){
    that.container.removeFranchise(that.franchise);
    if(that.parent && that.parent.render){
      that.parent.render();
    }
  });
  btn.append("Remove Franchise");
  return btn;
}
