/* 
 * THIS FILE CONTAINS TECHNICAL DEBT
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

StoryForm.prototype.renderCallback = function(){
  var that = this;
  return function(){
    console.log("Rendering in callback");
    that.render();
  }
}
/*
 * The setup function handles one-time setup.
 * These are the things that we don't render on each pass.
 */
StoryForm.prototype.setup = function(){
  console.log("Setting shit up");

  if(this._hasSetUp){
    throw "You can't set up twice!";
  }
  /*
   * this is a helper object, which holds jQuery objects representing the
   * elements of the form. It makes adding errors much, much easier.
   */
  this.form = {};
  
  this.form.name = $("#story-name-field");
  this.form.description = $("#story-description-field");
  this.form.blurb = $("#story-blurb-field");
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
  this.container.append(suggestDiv);
  this.form.franchises = $("<ul>").attr({
    id: "story-franchise-container"
  });
  this.container.append(this.form.franchises);
  this.form.characters = $("<ul>").attr({
    id: "story-character-container"
  });
  this.container.append(this.form.characters);
  $("#story-form-submit").click(function(e){
    e.preventDefault();
    console.log(e);
    console.log(that);
    that.submitForm();
  });
  this.ship = new Ship(this.story);
}
StoryForm.prototype.submitForm = function(){
  console.log("Submitting form!");
  console.log(this);
  var toSubmit = {}
  toSubmit.name = this.form.name.val();
  toSubmit.description = this.form.description.val();
  toSubmit.blurb = this.form.blurb.val();
  toSubmit.language = $("#story-language-select").val();
  toSubmit.license = $("#story-license-select").val();
  toSubmit.franchise_ids = [];
  for(var f in this.story.franchises){
    toSubmit.franchise_ids.push(this.story.franchises[f].id);
  }
  toSubmit.character_ids = [];
  for(var c in this.story.characters){
    toSubmit.character_ids.push(this.story.characters[c].id);
  }
  toSubmit.ship_attrs = [];
  for(var s in this.story.ships){
    var characters = $.map(this.story.ships[s].characters, function(n, i){
      return n.id;
    });
    toSubmit.ship_attrs.push({characters: characters});
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
    var res = data.responseJSON;
    console.warn(res);
    that.displayErrors(res);
  };
  $.ajax({
    url: url,
    type: type,
    dataType: "json",
    contentType: 'application/json',
    processData: false,
    success: success,
    error: error,
    data: JSON.stringify({story: toSubmit})
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
    var box = franchise.listItemWithDelete(this.story, this.renderCallback());
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
