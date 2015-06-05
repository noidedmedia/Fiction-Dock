function Ship(obj){
  this.characters = []
  for(var prop in obj){
    if(prop == "characters"){
      for(var c in obj.characters)
        this.characters.push(new Character(obj.characters[c]));
    }
    else{
      this[prop] = obj[prop];
    }
  } 
}
