function ShipCharacterDisplay(ship, parent){
  this.ship = ship;
  this.parent = parent;
}

ShipCharacterDisplay.prototype.getBox = function(label){
  this.box = $("<div>").attr({class: "ship-container"});
  if(label){
    this.box.append($("<p>").append(label));
  }
  this.box.append(this.removeButton());
  this.list = $("<ul>").attr({class: "character-list ship-characters"});
  this.box.append(this.list);
  return this.box;
}
ShipCharacterDisplay.prototype.removeButton = function(){
  var that = this;
  var btn = $("<button>").attr({class: "remove-ship-button"});
  btn.append("Remove Ship");
  btn.click(function(){
    that.ship.story.removeShip(that.ship);
    if(that.parent){
      if(that.parent.renderShips){
        that.parent.renderShips();
      }
      else{
        that.parent.render();
      }
    }
  });
  return btn;
}
ShipCharacterDisplay.prototype.render = function(){
  console.log("Rendering a ship.");
  this.list.empty();
  var that = this;
  this.ship.characters.forEach(function(character){
    var itm = new CharacterListItem(character, this.ship, true);
    var disp = itm.getItem(true, function(){that.render()});
    this.list.append(disp);
  }, this);
  this.list.append(Character.newCharacterButton(this.ship,
        this.possibleCharactersToAdd(),
        true,
        function(){that.render()}));
}

ShipCharacterDisplay.prototype.possibleCharactersToAdd = function(){
  var possible = this.ship.story.characters.filter(function(character){
    return this.ship.characters.indexOf(character) == -1;
  }, this);
  console.log("The ships that are possible are:");
  console.log(possible);
  return possible;
}
