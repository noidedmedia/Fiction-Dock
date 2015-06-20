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

