/*
 * Object that represents a story
 * Construct with the JSON returned by the API
 */
function Story(obj){
  for(var prop in obj){
    this[prop] = obj[prop];
  }
  if(this.id){
    Story.cache[this.id] = this;
    console.log("Story.cache is");
    console.log(Story.cache);
    this.baseURL = "/stories/" + this.id;
  }
  else{
    console.log("Made new story with no id.");
  }
}

Story.prototype.addFranchise = function(franchise){
  if(this.franchises.indexOf(franchise == -1)){
    console.log("Adding franchise to story");
    console.log(franchise);
    this.franchises.push(franchise);
  }
};

Story.prototype.removeCharacter = function(character){
  this.characters.splice(this.characters.indexOf(character), 1);
};

Story.prototype.addCharacter = function(character){
  if(this.characters.indexOf(character) == -1){
    this.characters.push(character);
  }
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
      var newFranch = [];
      for(var d in data){
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
