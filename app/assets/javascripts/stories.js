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
      for(var s in obj.ships)
        this.ships.push(new Ship(obj.ships[s]));
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

Story.prototype.addShip = function(ship){
  this.ships.push(ship);
}

Story.prototype.removeShip = function(s){
  for(var si in this.ships){
    var ship = this.ships[si];
    if(ship.id == s.id){
      this.ships.splice(s, 1);
    }
  }
}
/* 
 * Update the story to only contain valid characters
 * Store them in story.potentialCharacters
 * Store the indexes of charactesr actually in the story in potentiaCharacterIndexes
 */
Story.prototype.updateCharacters = function(){
  console.log("Updating characters in story");
  this.potentialCharacters = [];
  for(var f in this.franchises){
    var fr = this.franchises[f];
    for(var c in fr.characters){
      this.potentialCharacters.push(fr.characters[c]);
    }
  }
  // Potential character indexes holds the index within potentialCharacters
  // of characters in this story
  //
  // Useful to check if a character is already in the story while iterating
  // through potentialChacaters
  this.potentialCharacterIndexes = [];
  for(var c in this.characters){
    var isValid = false;
    // TODO: Make this sorted so we can do a binary search
    for(var pc in this.potentialCharacters){
      if(this.potentialCharacters[pc].id == this.characters[c].id){
        isValid = true;
       
        this.potentialCharacterIndexes.push(pc);
      }
    }
    if( ! isValid){
      this.removeCharacter(this.characters[c]);
    }
  }
}


Story.prototype.removeCharacter = function(cr){
  for(var c in this.characters){
    if(this.characters[c].id == cr.id){
      this.characters.splice(c, 1);
    }
  }
}

Story.prototype.addCharacter = function(cr){
  for(var c in this.characters){
    if(this.characters[c].id == cr.id){
      return -1;
    }
  }
  this.characters.push(cr);
  return this.characters.length - 1;
}
Story.prototype.addFranchise = function(fr){
  console.log("Adding franchise with id: " + fr.id);
  for(var f in this.franchises){
    if(this.franchises[f].id == fr.id){
      return -1
    }
  }
  this.franchises.push(fr);
  return this.franchises.length - 1;
}

Story.prototype.removeFranchise = function(fr){
  console.log("Removing franchise with id: " + fr.id);
  for(var f in this.franchises){
    console.log("Checking against id: " + this.franchises[f].id);
    if(this.franchises[f].id == fr.id){
      this.franchises.splice(f, 1);
    }
  }
}
Story.byId = function(id, callback){
  $.ajax("/stories/" + id + ".json", {
    dataType: "json",
    success: function(response){
      callback(new Story(response));
    }
  });
}

