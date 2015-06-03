// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

/*
 * Serialize a franchise obtained via JSON to a real object
 */
function Franchise(obj){
  for(var key in obj){
    if(key == "characters"){
      var characters = obj.characters;
      this.characters = [];
      for(var character in characters){
        this.characters.push(new Character(characters[character]));
      }
    }
    else{
      this[key] = obj[key];
    }
  }
}

Franchise.prototype._baseUrl = function(){
  return "/franchises/" + this.id + "/";
}
Franchise.prototype._charactersUrl = function(){
  return this._baseUrl() + "/characters.json";
}


Franchise.prototype.characters = function(callback){
  var success = function(data, status){
    var ar = [];
    for(var d in data){
      ar.push(new Character(data));
    }
    callback(data);
  };
  $.ajax(this._charactersUrl(), {
    success: success,
    dataType: 'json'
  });
}

Franchise.getById = function(id, callback){
  var success = function(data){
    callback(new Franchise(data));
  }
  $.ajax("/franchises/" + id, {
    dataType: 'json',
    success: success
  });
}
Franchise.all = function(callback){
  var success = function(data, status){
    var ar = [];
    console.log(data);
    for(var d in data){
      ar.push(new Franchise(data[d]));
    }
    callback(ar);
  }
  $.ajax("/franchises/", {
    success: success,
    dataType: "json"
  });
}

