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
  // Input box for the name of the story
  this.nameBox = $("<input>").attr({
    id: "story-name-box",
  type: "text",
  value: this.story.name
  });
  this.container.append(this.nameBox);
  this.descriptionBox = $("<textarea>").attr({
    id: "story-description-box"
  }).append(this.story.description);
  this.container.append(this.descriptionBox);
  this.blurbBox = $("<textarea>").attr({
    id: "story-blurb-box"
  }).append(this.story.blurb);
  this.container.append(this.blurbBox);
  this.franchiseContainer = $("<ul>").attr({
    id: "story-franchise-container"
  });
  this.container.append(this.franchiseContainer);
  this.characterContainer = $("<ul>").attr({
    id: "story-character-container"
  });
  this.container.append(this.characterContainer);
  this._hasSetUp = true;
  this.render();
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
    that.story.characters.append(ch);
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
  this.franchiseContainer.empty();
  for(var f in this.story.franchises){
    var franchise = this.story.franchises[f];
    var callback = this._removeFranchiseCallback(franchise);
    var box = franchise.formDisplayBox(callback);
    this.franchiseContainer.append(box);
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
