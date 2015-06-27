function Character(obj){
  for(var key in obj) {
    this[key] = obj[key];
  }
  if(this.id){
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
  
  var btn = $("<button>").attr({class: "new-character-button"}).append("Add a character");
  btn.click(function(){
    btn.replaceWith(Character._addList(container, list, showfname, callback));
  });
  return btn;
}

Character._addList = function(container, list, showfname, callback){
  console.groupCollapsed();
  console.log("Generating a list of characters to add.");
  console.log("Container:", container, "list:", list, "showfname:", showfname,
      "callback", callback);
  var ul = $("<ul>");
  list.forEach(function(character){
    var itm = new CharacterListItem(character, container, false);
    console.log("Made new CharacterListItem:", itm);
    ul.append(itm.getItem(showfname, callback));
  });
  console.groupEnd();
  return ul;
}
