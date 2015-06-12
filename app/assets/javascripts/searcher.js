/*
 * This is not DRY at all. It repeats a bunch of stuff in the StoryForm
 * JavaScript.
 *
 * So I need to fix that at some point.
 */
function SearchControls(container){
  this.container = $(container);
  this.story = new Story({});
}
SearchControls.prototype.takeControl = function(){
  // Append a suggestor which adds to our franchise list
  var that = this;
  this.suggestor = Franchise.suggestDisplay(function(franchise){
    that.story.addFranchise(franchise);
    that.render();
  });
  this.container.append(this.suggestor);
  this.franchiseContainer = $("<ul>").attr({
    class: "franchise-container"
  });
  this.story.ships = [new Ship({})];
  this.container.append(this.franchiseContainer);
  this.shipForm = new ShipForm(this.story, true);
  this.shipForm.setup(function(shipContainer){
    that.container.append(shipContainer);
    that.addSubmitButton();
    that.render();
  });
}

/* 
 * Render the search controls on-screen
 */
SearchControls.prototype.render = function(){
  console.log("Starting render. This is:");
  console.log(this);
  this.story.updateCharacters();
  this._renderFranchises();
  this._renderCharacters();
  this.shipForm.render();
}

SearchControls.prototype._renderCharacters = function(){
  for(var c in this.story.potentialCharacters){
    var character = this.story.potentialCharacters[c];
    var checked = (this.story.potentialCharacterIndexes.indexOf(c) > -1);
    var box = character.formDisplay(checked, this.story, this.renderCallback());
    this.franchiseContainer.find(".franchise-" + character.franchise_id).append(box);
  }
}
SearchControls.prototype.renderCallback = function(){
  var that = this;
  return function(){
    that.render();
  };
}
SearchControls.prototype._renderFranchises = function(){
  this.franchiseContainer.empty();
  for(var f in this.story.franchises){
    var franchise = this.story.franchises[f];
    var item = franchise.listItemWithDelete(this.story, this.renderCallback());
    this.franchiseContainer.append(item);
  }
}
SearchControls.prototype.removeFranchise = function(franchise){
  for(var f in this.franchises){
    if(this.franchises[f].id == franchise.id){
      this.franchises.splice(f, 1);
    }
  }
}
SearchControls.prototype.addSubmitButton = function(){
  var that = this;
  var btn = $("<button>");
  btn.click(function(){
    that.submit();
  });
  btn.append("Search");
  this.container.append(btn);
}
SearchControls.prototype.submit = function(){
  console.log("story is");
  console.log(this.story);
  var to_s = {};
  to_s.franchises = [];
  for(var f in this.story.franchises){
    to_s.franchises.push(this.story.franchises[f].id);
  }
  to_s.characters = [];
  for(var c in this.story.characters){
    to_s.characters.push(this.story.characters[c].id);
  }
  to_s.ship = [];
  for(var s in this.story.ships[0].characters){
    to_s.ship.push(this.story.ships[0].characters[s].id);
  }
  console.log(to_s);
  console.log(this.story);
  window.location.href = "/stories/search?" + $.param(to_s);
}
$(function(){
  var d;
  if(d = document.getElementById("searchControls"))
  { 
    console.log("On search page. Setting up controls...");
    var control = new SearchControls(d);
    control.takeControl();
  } 
});
