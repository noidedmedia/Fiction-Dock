/* 
 * THIS FILE CONTIANS TECHNICAL DEBT
 *
 * IT IS A HORRIBLE GOD-OBJECT I FEEL BAD FOR WRITING
 *
 * LOOK AT THE COMMIT HISTORY, IT USED TO BE __WORSE__!
 *
 * I've tried to comment it as best I can. Still, monsters lurk within.
 *
 * Ye have been warned. 
 */
function StoryForm(){
  this.container = $("#story-form");
  this.storyId = parseInt(this.container.data("story-id"));
  if(isNaN(this.storyId)){
    this.storyId = undefined;
  }
}

StoryForm.prototype.isNew = function(){
  return (this.storyId == undefined);
}
/*
 * The setup function handles one-time setup.
 * These are the things that we don't render on each pass.
 */
StoryForm.prototype.setup = function(){
  if(this._hasSetUp){
    throw "You can't set up twice!";
  }
  /*
   * this is a helper object, which holds jQuery objects representing the
   * elements of the form. It makes adding errors much, much easier.
   */
  this.form = {};
  /*
   * In the next section, we basically just build up some inputs and
   * add them to the DOM.
   * TODO: Refactor this to use templates or something
   */
  this.form.name = $("<input>").attr({
    id: "story-name-box",
  type: "text",
  value: this.story.name
  });
  this.container.append(this.form.name);
  this.form.description = $("<textarea>").attr({
    id: "story-description-box"
  }).append(this.story.description);
  this.container.append(this.form.description);
  this.form.blurb = $("<textarea>").attr({
    id: "story-blurb-box"
  }).append(this.story.blurb);
  this.container.append(this.form.blurb);
  var that = this;
  /*
   * Here, we add a franchise-suggestor
   *
   * That's in the franchises.js file, so look there for documentation.
   */
  var suggestDiv = $("<div>").attr({
    class: "franchise-suggestor-container"
  });
  suggestDiv.append($("<div>").attr({
    class: "franchise-suggestor-label"
  }).append("Add a Franchise:"));
  // Add a franchise suggestor that will add a franchise on selection
  suggestDiv.append(Franchise.suggestDisplay(function(fr){
    that.story.addFranchise(fr);
    that.render();
  }));
  this.container.append(suggestDiv);
  this.form.franchises = $("<ul>").attr({
    id: "story-franchise-container"
  });
  this.container.append(this.form.franchises);
  this.form.characters = $("<ul>").attr({
    id: "story-character-container"
  });
  this.container.append(this.form.characters);
  this.submitButton = $("<input>").attr({
    type: "submit",
    value: "Submit"
  });
  this.submitButton.click(function(e){
    e.preventDefault();
    that.submitForm();
  });
  this.shipForm = new ShipForm(this.story);
  this.shipForm.setup(function(shipContainer){
    that.container.append(shipContainer);
    that.container.append(Ship.newShipButton(that.story, function(){
      that.render();
    }));
    that._hasSetUp = true;
    that.container.append(that.submitButton);
    that.render();
  });
}
StoryForm.prototype.submitForm = function(){
  console.log("Submitting form!");
  console.log(this);
  var toSubmit = {}
  toSubmit.name = this.form.name.val();
  toSubmit.description = this.form.description.val();
  toSubmit.blurb = this.form.blurb.val();
  toSubmit.franchise_ids = [];
  for(var f in this.story.franchises){
    toSubmit.franchise_ids.push(this.story.franchises[f].id);
  }
  toSubmit.character_ids = [];
  for(var c in this.story.characters){
    toSubmit.character_ids.push(this.story.characters[c].id);
  }
  toSubmit.ships_attributes = [];
  for(var s in this.story.ships){
    var ship = this.story.ships[s];
    // Ship object we build up to properly format our data
    var sship = {};
    sship.id = ship.id;
    sship.character_ids = [];
    for(var c in ship.characters){
      sship.character_ids.push(ship.characters[c].id);
    }
    toSubmit.ships_attributes.push(sship);
  }
  console.log("Trying to submit");
  console.log(toSubmit);
  if(this.isNew()){
    var url = "/stories/";
    var type = "post";
  }
  else{
    var url = "/stories/" + this.storyId;
    var type = "put";
  }
  var that = this;
  var success = function(data){
    console.log("Success!");
    window.location.href = "/stories/" + data.id;
  };
  var error = function(data){
    console.warn("Error in AJAX request");
    console.warn(res);
    var res = data.responseJSON;
    console.warn(res);
    that.displayErrors(res);
  };
  $.ajax({
    url: url,
    type: type,
    dataType: "json",
    success: success,
    error: error,
    data: {story: toSubmit}
  });
  console.log("Story theoretically AJAXes successfully");
}
StoryForm.prototype._makeError = function(err){
  var container = $("<ul>").attr({
    class: "errors-list"
  });
  for(e in err){
    container.append($("<li>").append(err[e]));
  }
  return container;
}
StoryForm.prototype.displayErrors = function(err){
  // Clear our all our old errors first
  $(".errors-list").empty();
  for(var prop in err){
    if(this.form[prop]){
      this.form[prop].before(this._makeError(err[prop]));
    }
  }
}
StoryForm.prototype.render = function(){
  this._renderFranchises();
  this._renderCharacters();
  this.shipForm.render();
}

StoryForm.prototype._renderCharacters = function(){
  var that = this;
  this.story.updateCharacters();
  for(var c in this.story.potentialCharacters){
    var ch = this.story.potentialCharacters[c];
    var box;
    box = ch.formDisplay((this.story.potentialCharacterIndexes.indexOf(c) > -1), this.story, function(){
      console.log("Rendering...");
      that.render();
    });
    this.form.franchises.find(".franchise-" + ch.franchise_id).append(box);
  }
}

StoryForm.prototype._addCharacterCallback = function(ch){
  var that = this;
  return function(){
    that.story.addCharacter(ch);
    that.render();
  }
}

StoryForm.prototype._renderFranchises = function(){
  console.log("Rendering franchises");
  this.form.franchises.empty();
  for(var f in this.story.franchises){
    var franchise = this.story.franchises[f];
    var box = franchise.formDisplayBox(this);
    this.form.franchises.append(box);
  }
}
StoryForm.prototype.takeControl = function(){
  if(this.isNew()){
    console.log("New story detected, taking control");
    this.story = new Story({});
    this.setup();
  }
  else{
    var that = this;
    console.log("Existing story detected, fetching data...");
    Story.byId(this.storyId, function(story){
      console.log("In setup, got story:");
      console.log(story);
      console.log("Taking control.");
      that.story = story;
      that.setup();
    });
  }
}
$(function(){
  if(document.getElementById("story-form")){
    var form = new StoryForm();
    form.takeControl();
  }
});
