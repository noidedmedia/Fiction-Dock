function Character(obj){
  for(var key in obj) {
    this[key] = obj[key];
  }
  if(this.id){
    console.log("Registering character with id: " + this.id);
    Character.cache[this.id] = this;
  }
  this.franchise = Franchise.cache[this.franchise_id];
}
/*
 * A cache object
 * Keys are the character id
 * Values are the character object
 */
Character.cache = {}
Character.getByJson = function(json){
  if(json.id){
    var c;
    if(c = Character.cache[json.id]){
      console.log("Character with id " + json.id + "in cache, returning it");
      return c;
    }
    else{
      return new Character(json);
    }
  }
}

Character.newCharacterButton = function(container, list, showfname, callback){
  var btn = $("<button>").attr({class: "new-character-button"});
  btn.click(function(){
    btn.replaceWith(Character._addList(container, list, showfname, callback));
  });
  btn.append("Add a character");
  return btn;
}

Character._addList = function(container, list, showfname, callback){
  var ul = $("<ul>");
  console.log("list is");
  console.log(list);
  list.forEach(function(character){
    var itm = new CharacterListItem(character, container, false);
    ul.append(itm.getItem(showfname, callback));
  });
  return ul;
}
