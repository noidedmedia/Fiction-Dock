/*
 * A (sort of horrible) bit of JavaScript for managing the creation of a story
 * TODO: rename to "techncial_debt.js"
 * TODO: talk to the Pope about cleansing this file
 * TODO; fix this file
 */
// Object that represents a story
function Story(obj){
  this.franchises = [];
  this.characters = [];
  for(var prop in obj){
    if(prop === "characters"){
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
  for(var f in this.franchises){
    if(this.franchises[f].id == fr.id){
      return -1
    }
  }
  this.franchises.push(fr);
  return this.franchises.length - 1;
}
Story.byId = function(id, callback){
  $.ajax("/stories/" + id + ".json", {
    dataType: "json",
  success: function(response){
    callback(new Story(response));
  }
  });
}

