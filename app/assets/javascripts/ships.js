function Ship(obj){
  this.characters = [];
  for(var prop in obj){
    if(prop == "characters"){
      for(var c in obj.characters){
        this.characters.push(Character.getByJson(obj.characters[c]));
      }
    }
    else{
      this[prop] = obj[prop];
    }
  }
}

Ship.prototype.addCharacter = function(character){
  if(this.characters.indexOf(character) == -1){
    this.characters.push(character);
  }
}

Ship.prototype.removeCharacter = function(character){
  this.characters.splice(this.characters.indexOf(character), 1);
}
Ship.addShipButton = function(container, callback){
  var btn = $("<button>").attr({class: "add-ship-button"}).append("Add a ship");
  btn.click(function(){
    container.addShip(new Ship({}));
    callback();
  });
  return btn;
}

Ship.cache = {};

Ship.getByJson = function(json){
  if(json.id){
    var s;
    if(s = this.cache[json.id]){
      return s;
    }
    else{
      return new Story(json);
    }
  }
}
