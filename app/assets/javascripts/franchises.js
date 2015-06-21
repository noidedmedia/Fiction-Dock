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
        this.characters.push(Character.getByJson(characters[character]));
      }
    }
    else{
      this[key] = obj[key];
    }
  }
  if(this.id){
    console.log("Registering");
    console.log(this);
    console.log("In franchise cache (id " + this.id + ")");
    Franchise.cache[this.id] = this;
  }
}
/*
 * A cache object. Keys are the ids of a franchise, value is the real
 * franchise object.
 */
Franchise.cache = {}

Franchise.getByJson = function(json){
  if(json.id){
    var franch;
    if(franch = Franchise.cache[json.id]){
      return franch;
    }
    return new Franchise(json);
  }
}
