function Ship(obj){
  this.characters = [];
  for(var prop in obj){
    if(prop == "characters"){
      for(var c in obj.characters){
        this.characters.push(Character.getByJson(obj.characters[c]));
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



Ship.cache = {};

Ship.getByJson = function(json){
  if(json.id){
    var s;
    if(s = this.cache[json.id]){
      return s;
    }
    else{
      return new Story(json);
    }
  }
}
