/*
 * Object that represents a story
 * Construct with the JSON returned by the API
 */
function Story(obj){
  this.franchises = [];
  this.characters = [];
  this.ships = [];
  for(var prop in obj){
    if(prop == "ships"){
      for(var s in obj.ships){
        var ship = new Ship(obj.ships[s]);
        ship.story = this;
        this.ships.push(ship);
      }
    }
    else if(prop === "characters"){
      for(var c in obj.characters){
        this.characters.push(new Character(obj.characters[c]));
      }
    }
    else if(prop === "franchises"){
      for(var f in obj.franchises){
        var fr = new Franchise(obj.franchises[f]);
        this.franchises.push(fr);
      }
    }
    else{
      this[prop] = obj[prop];
    }
  }
}
/*
 * Find the index of a franchise by the ID
 */
Story.prototype.indexOfFranchise = function(franchise){
  for(var f in this.franchises){
    if(this.franchises[f].id == franchise.id){
      return f;
    }
  }
  return -1;
}
/*
 * add a franchise, assuming it's not in this story already
 */
Story.prototype.addFranchise = function(franchise){
  if(this.indexOfFranchise(franchise) == -1){
    this.franchises.push(f);
    this.render();
  }
}
/*
 * See if a story can contain a character.
 * This bascially checks if a character is in `potentialCharacters`.
 */
Story.prototype.canContainCharacter = function(character){
  for(var c in this.potentialCharacters){
    if(this.potentialCharacters[c].id == character.id){
      return true;
    }
  }
  return false;
}
/*
 * Remove a ship from the story.
 * NOTE: does not check via id, instead checking via object equivalence
 */
Story.prototype.removeShip = function(ship){
  this.ships.splice(this.ships.indexOf(ship), 1);
}
/*
 * Update the list of potential characters.
 * Useful when a franchise is added or removed.
 */
Story.prototype.updatePotentialCharacters = function(){
  this.potentialCharacters = [];
  for(var f in this.franchises[f]){
    for(var c in this.franchises[f].characters){
      this.potentialCharacters.push(this.franchises[f].characters[c]);
    }
  }
  for(var c in this.characters){
    if(! this.characters.canContainCharacter(this.characters(c)))
      this.characters.splice(c, 1);
  }
  this.updateShipCharacters();
  this.render();
}
/*
 * Tell all our ships to update their characters.
 */
Story.prototype.updateShipCharacters = function(){
  for(var s in this.ships){
    this.ships[s].updateCharacters();
  }
}
/*
 * Remove a franchise from our list of franchises
 */
Story.prototype.removeFranchise = function(franchise){
  var ind = this.indexOfFranchise(franchise);
  if(ind > -1){
    this.franchises.splice(ind, 1);
    this.updatePotentialCharacters();
    this.render();
  }
}
/*
 * Find the index of `character` in our list of characters.
 * Compares via id
 * Returns -1 if nothing found
 */
Story.prototype.indexOfCharacter = function(character){
  for(var c in this.characters){
    if(this.characters[c].id == character.id){
      return c;
    }
  }
  return -1;
}
/*
 * Add a character to the story, assuming it was not already inside
 */
Story.prototype.addCharacter = function(character){
  if(this.indexOfCharacter(character) == -1 && this.canContainCharacter(character)){
    this.characters.push(character);
    this.render();
  }
}
/*
 * Remove a character from this story.
 */
Story.prototype.removeCharacter = function(character){
  var ind = this.indexOfCharacter(character);
  if(ind > -1){
    this.characters.splice(ind, 1);
    this.render();
  }
}

Story.prototype.render = function(){
  if(this.displayer)
    this.displayer.render();
}
/*
 * Fetch a story by ID
 *
 * Pass this story on to `callback`
 */
Story.byId = function(id, callback){
  $.ajax("/stories/" + id + "json", {
    dataType: "json",
    success: function(response){
      callback(new Story(response));
    }
  });
}

