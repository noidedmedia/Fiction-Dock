/*
 * A (sort of horrible) bit of JavaScript for managing the creation of a story
 * TODO: rename to "techncial_debt.js"
 * TODO: talk to the Pope about cleansing this file
 * TODO; fix this file
 */
// Object that represents a story
function Story(obj){
  this.franchises = [];
  this.characters = [];
  for(var prop in obj){
    if(prop === "characters"){
      for(var c in obj.characters){
        this.characters.push(new Character(obj.characters[c]));
      }
    }
    else if(prop === "franchises"){
      for(var f in obj.franchises){
        var fr = new Franchise(obj.franchises[f]);
        this.franchises.push(fr);
      }
    }
    else{
      this[prop] = obj[prop];
    }

  }
}

Story.prototype.addCharacter = function(cr){
  for(var c in this.characters){
    if(this.characters[c].id == cr.id){
      return -1;
    }
  }
  this.characters.push(cr);
  return this.characters.length - 1;
}
Story.prototype.addFranchise = function(fr){
  for(var f in this.franchises){
    if(this.franchises[f].id == fr.id){
      return -1
    }
  }
  this.franchises.push(fr);
  return this.franchises.length - 1;
}
Story.byId = function(id, callback){
  $.ajax("/stories/" + id + ".json", {
    dataType: "json",
  success: function(response){
    callback(new Story(response));
  }
  });
}
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
  // Helper object for all of our form objects
  // Makes registering errors easier
  this.form = {};
  // Input box for the name of the story
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
  this.container.append(this.submitButton);
  this._hasSetUp = true;
  this.render();
}
StoryForm.prototype.submitForm = function(){
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
    console.log(data);
  }
  var error = function(data){
    console.log("ERROR!");
    var res = data.responseJSON;
    that.displayErrors(res);
  }
  $.ajax({
    url: url,
    type: type,
    dataType: "json",
    success: success,
    data: {story: toSubmit}
  }).fail(error);
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
    console.log("Checking for prop: " + prop);
    if(this.form[prop]){
      this.form[prop].before(this._makeError(err[prop]));
    }
  }
}
StoryForm.prototype.render = function(){
  this._renderFranchises();
  this._renderCharacters();
}

StoryForm.prototype._removeFranchiseCallback = function(fr){
  var that = this;
  return function(){
    console.log("remove franchise called");
    var index = that.story.franchises.indexOf(fr);
    console.log("index is: " + index);
    if(index > -1){
      that.story.franchises.splice(index, 1);
      that.render();
    }
  }
}
/*
 * Get a list of all valid characters for this story
 * That is, the list of all characters in the story's franchises
 */
StoryForm.prototype._updatePotentialCharacters = function(){
  this.potentialCharacters = [];
  for(var f in this.story.franchises){
    var fr = this.story.franchises[f];
    for(var c in fr.characters){
      this.potentialCharacters.push(fr.characters[c]);
    }
  }
}
// Remove characters from non-valid franchises from our story
StoryForm.prototype._updateStoryCharacters = function(){
  // Store a list of story character indexes for later display
  this.storyCharacterIndexes = [];
  for(var c in this.story.characters){
    var isValid = false
      // TODO: Make these sorted so this can be a binary search
      for(var vc in this.potentialCharacters){
        if(this.potentialCharacters[vc].id == this.story.characters[c].id){
          isValid = true;
          this.storyCharacterIndexes.push(vc);
        }
      }
    if(! isValid){
      // Remove from the story's characters
      this.story.characters.slice(c, 1);
    }
  }
}
/*
 * Returns a callback that removes `ch` from story's characters
 * Uses ID comparison
 */
StoryForm.prototype._removeCharacterCallback = function(ch){
  var that = this;
  return function(){
    console.log("REMOVING CHARACTER");
    console.log(c);
    for(var c in that.story.characters){
      if(that.story.characters[c].id == ch.id){
        that.story.characters.splice(c, 1);
      }
    }
    that.render();
  }
}

StoryForm.prototype._addCharacterCallback = function(ch){
  var that = this;
  return function(){
    that.story.addCharacter(ch);
    that.render();
  }
}
/*
 * Render the characters section
 * Done after the franchises
 */
StoryForm.prototype._renderCharacters = function(){
  this._updatePotentialCharacters();
  this._updateStoryCharacters();
  for(var c in this.potentialCharacters){
    var box;
    if(this.storyCharacterIndexes.indexOf(c) > -1){
      var ch = this.potentialCharacters[c];
      box = ch.formDisplay(true, this._removeCharacterCallback(ch));
    }
    else{
      var ch = this.potentialCharacters[c];
      box = ch.formDisplay(false, this._addCharacterCallback(ch));
    }
    $("#franchise-" + ch.franchise_id).append(box);
  }
}
StoryForm.prototype._renderFranchises = function(){
  this.form.franchises.empty();
  for(var f in this.story.franchises){
    var franchise = this.story.franchises[f];
    var callback = this._removeFranchiseCallback(franchise);
    var box = franchise.formDisplayBox(callback);
    this.form.franchises.append(box);
  }
}
StoryForm.prototype.takeControl = function(){
  if(this.isNew()){
    console.log("new story detected");
    this.story = new Story({});
    this.setup();
  }
  else{
    console.log("Existant story detected, grabbing JSON");
    var that = this;
    Story.byId(this.storyId, function(story){
      console.log("Grabbed json gave story:")
      console.log(story)
      that.story = story;
    that.setup();
    });
  }
}
$(function(){
  if(document.getElementById("story-form")){
    console.log("Making a form and taking control");
    var form = new StoryForm();
    form.takeControl();
  }
});
