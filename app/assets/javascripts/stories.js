/*
 * Object that represents a story
 * Construct with the JSON returned by the API
 */
function Story(obj){
  console.group();
  console.debug("Creating new story with obj:", obj);
  for(var prop in obj){
    this[prop] = obj[prop];
  }
  if(this.id){
    console.debug("This story has id:", this.id, "putting it in cache");
    Story.cache[this.id] = this;
    this.baseURL = "/stories/" + this.id;
  }
  else{
    this.franchises = [];
    this.characters = [];
    this.ships = [];
    console.debug("Story does not have id, creating it anew.");
  }
  console.debug("At the end of story creation, it looks like:",this);
  console.groupEnd();
}

Story.prototype.addFranchise = function(franchise){
  if(this.franchises.indexOf(franchise == -1)){
    console.log("Adding franchise to story");
    console.log(franchise);
    this.franchises.push(franchise);
  }
};
Story.prototype.formSerialize = function(){
  var toSubmit = {};
  var KEYS_AS_IS = [ "name",
      "license",
      "language",
      "blurb",
      "description"]
  for(var key in this){
    if(KEYS_AS_IS.indexOf(key) !== -1){
      toSubmit[key] = this[key];
    }
  }
  toSubmit.franchise_ids = this.franchises.map(function(fr){return fr.id});
  toSubmit.character_ids = this.characters.map(function(fr){return fr.id});
  toSubmit.ship_attrs = [];
  this.ships.forEach(function(ship){
    var obj = {};
    obj.characters = ship.characters.map(function(cr){return cr.id});
    toSubmit.ship_attrs.push(obj);
  });
  console.log(JSON.stringify(toSubmit));
  return {story: toSubmit};
}
Story.prototype.removeFranchise = function(franchise){
  console.group();
  console.debug("Removing franchsie:",franchise,"from story:",this);
  this.franchises.splice(this.franchises.indexOf(franchise), 1);
  var toRemove = this.characters.filter(function(character){
    return character.franchise_id == franchise.id;
  });
  console.log("Removing contained child characters of parent franchise:",
      toRemove);
  toRemove.forEach(function(character){
    this.characters.splice(this.characters.indexOf(character));
    this.ships.forEach(function(ship){
      ship.removeCharacter(character);
    });
  }, this);
  console.groupEnd();
}
Story.prototype.addShip = function(ship){
  this.ships.push(ship);
  ship.story = this;
}

Story.prototype.removeShip = function(ship){
  this.ships.splice(this.ships.indexOf(ship), 1);
}
Story.prototype.removeCharacter = function(character){
  this.characters.splice(this.characters.indexOf(character), 1);
};

Story.prototype.addCharacter = function(character){
  console.group()
  console.log("Adding character:", character, "to story:", this);
  if(this.characters.indexOf(character) == -1){
    console.log("Character not already in, adding...");
    this.characters.push(character);
  }
  console.log("Characters array is:", this.characters,
      "is that a real array?:",
      this.characters.constructor == Array,
      "and has length:",
      this.characters.length);
  console.groupEnd();
};

/*
 * Fetch the franchises with AJAX.
 * call the callback with `this` as the arg when done.
 */
Story.prototype.fillFranchises = function(callback){
  var that = this;
  $.ajax(this.baseURL + "/franchises.json", {
    dataType: "json",
    success: function(data){
      console.log("Filling franchises in story, got data:");
      console.log(data);
      var newFranch = [];
      for(var d in data){
        console.log("Adding franchise with data:");
        console.log(data);
        newFranch.push(Franchise.getByJson(data[d]));
      }
      that.franchises = newFranch;
      callback(that);
    }
  });
};

Story.prototype.fillCharacters = function(callback){
  var that = this;
  $.ajax(this.baseURL + "/characters.json", {
    dataType: "json",
    success: function(data){
      var nc = [];
      for(var d in data){
        nc.push(Character.getByJson(data[d]));
      }
      that.characters = nc;
      callback(that);
    }
  });
};

Story.prototype.fillShips = function(callback){
  var that = this;
  $.ajax(this.baseURL + "/ships.json", {
    dataType: "json",
    success: function(data){
      var nc = [];
      for(var d in data){
        nc.push(Ship.getByJson(data[d]));
      }
      that.ships = nc;
      callback(that);
    }
  });
};

/*
 * A cache of storyId -> story
 */
Story.cache = {};



/*
 * Fetch a story by ID
 *
 * Pass this story on to `callback`
 */
Story.byId = function(id, callback){
  $.ajax("/stories/" + id + ".json", {
    dataType: "json",
    success: function(response){
      var s = new Story(response);
      callback(s);
    }
  });
};

Story.prototype.fillAll = function(callback, progress){
  this.fillFranchises(function(story){
    if(progress){
      progress(1/3);
    }
    story.fillCharacters(function(story1){
      if(progress){
        progress(2/3);
      }
      story.fillShips(function(story2){
        progress(3/3);
        callback(story2);
      });
    });
  });
};
