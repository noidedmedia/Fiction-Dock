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

Ship.newShipButton = function(story, click){
  var bt = $("<div>").attr({
    class: "new-ship-button"
  }).append("Add a ship").click(function(){
    story.addShip(new Ship({})); 
    click();
  });
  return bt;
}
Ship.prototype.addCharacter = function(c){
  if(this.containsCharacter(c))
    return;
  this.characters.push(c);
}
/*
 * Remove a character from the ship
 * TODO: replace with a binary search to avoid evil O[n]
 * Altneraitvely, turn characters into a hash of id -> character 
 * That's probably faster
 */
Ship.prototype.removeCharacter = function(c){
  for(var vc in this.characters){
    if(this.characters[vc].id == c.id){
      this.characters.splice(vc, 1);
    }
  }
}
Ship.prototype.containsCharacter = function(c){
  for(var vc in this.characters){
    if(this.characters[vc].id == c.id){
      return true;
    }
  }
  return false;
}
/*
 * Get a display box, for use in a form of some kind
 * Will pass the "done" callback to the add/remove functionality of each
 * character, to be ran when the character is added or removed.
 *
 * As such, `done` should probably render the changes somewhere.
 *
 * When the removal button is clicked, `removeship` will have the function
 * `removeShip` called with `this` as an argument. `done` will also be called.
 */
Ship.prototype.displayForForm = function(story, done, removeship){
  var container = $("<div>").attr({
    class: "ship-container"
  });
  var remove = $("<div>").attr({
    class: "ship-removal-button"
  }).append("Remove Ship");
  var that = this;
  remove.click(function(){
    removeship.removeShip(that);
    done()
  });
  container.append(remove);
  var list = $("<ul>");
  for(var f in story.franchises){
    list.append(story.franchises[f].listDisplay());
  }
  for(var c in story.characters){
    var character = story.characters[c];
    var contained = this.containsCharacter(character);
    var box = character.formDisplay(contained, this, done);
    list.find(".franchise-" + character.franchise_id).append(box);
  }
  return container.append(list);
}
function ShipForm(story){
  this.story = story;
}

ShipForm.prototype.render = function(){
  this.container.empty();
  var that = this;
  var renderCallback = function(){
    that.render();
  }
  for(var s in this.story.ships){
    var s = this.story.ships[s];
    this.container.append(s.displayForForm(this.story, renderCallback, this.story));
  }
}
ShipForm.prototype.setup = function(done){
  this.container = $("<div>").attr({
    class: "ship-container"
  });
  this.render();
  done(this.container);
}
