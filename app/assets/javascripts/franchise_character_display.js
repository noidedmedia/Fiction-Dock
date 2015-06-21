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
}
