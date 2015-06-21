function Ship(obj){
  this.characters = [];
  for(var prop in obj){
    if(prop == "characters"){
      for(var c in obj.characters){
        this.characters.push(new Character(obj.characters[c]));
      }
    }
    else{
      this[prop] = obj[prop];
    }
  }
}
/*
 * If the ship is given a displayer, this will tell that displayer to
 * `render` itself.
 */
Ship.prototype.render = function(){
  if(this.displayer) {
    this.displayer.render();
  }
}

// remove this ship from its parent story
Ship.prototype.sudoku = function(){
  this.story.removeShip(this);
}

// Find the index of a character in this ship
// returns -1 if the character isn't found
// compares via ID
Ship.prototype.indexOfCharacter = function(character){
  for(var c in this.characters){
    if(this.characters[c].id == character.id){
      return c;
    }
  }
  return -1;
}
/*
 * Add a character to this ship, if it's not already inside
 */
Ship.prototype.addCharacter = function(character){
  if(this.indexOfCharacter(character) == -1){
    // Character not currently contained
    if(this.story.indexOfCharacter(character) != -1){
      this.characters.push(character);
      this.render();
    }
  }
}
/*
 * Remove a character from this ship
 */
Ship.prototype.removeCharacter = function(character){
  var ind = this.indexOfCharacter(character);
  if(ind > -1){
    this.characters.splice(ind, 1);
    this.render();
  }
}
/*
 * Update this ship, removing all characters which are not present
 * in the parent story.
 */
Ship.prototype.updateCharacters = function(characters){
  for(var c in this.characters){
    if(this.story.indexOfCharacter(this.characters[c]) == -1){
      this.characters.splice(c, 1);
    }
  }
  this.render();
}
