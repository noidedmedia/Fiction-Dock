function StoryForm(story_id, container){
  this.story_id = story_id;
  this.container = container;
}

StoryForm.prototype.takeControl = function(){
  var that = this;
  if(this.story_id){
    this.addLoadingBar();
    console.log(this);
    Story.byId(this.story_id, function(story){
      that._loadingBar.attr({value: 10});
      that.story = story;
      story.fillAll(function(){
        that.finishedControl();
      }, function(progress){
        console.log("Form progressing to" + progress);
        that._loadingBar.attr({value: progress*100});
      });
    })
  }
  else{
    this.story = new Story({});
    that.finishedControl();
  }
}

StoryForm.prototype.finishedControl = function(){
  if(this._loadingBar){
    this._loadingBar.remove();
  }
  console.log("Control taken!");
  console.log(this);
  this.franchiseContainer = $("<div>").attr({
    id: "javascript-form-elements"
  });
  this.formContainer = $("#javascript-container");
  this.shipContainer = $("<div>").attr({id: "javascript-ship-list"});
  this.formContainer.append(this.franchiseContainer);
  this.formContainer.append(this.shipContainer);
  this.suggestor = new FranchiseSuggest(this.story, this);
  this.render();
  this.hijackSubmit();
}

StoryForm.prototype.hijackSubmit = function(){
  var that = this;
  var toHijack = $("#story-form-submit");
  toHijack.click(function(event){
    event.preventDefault();
    that.submit();
  });
}
StoryForm.prototype.getErrorsObject = function(){
  var obj = {}
  obj.name = $("#story-name-field")
    obj.language = $("#story-language-select")
    obj.license = $("story-license-select")
    obj.blurb = $("#story-blurb-field")
    obj.description = $("#story-description-field")
    return obj;
}
StoryForm.prototype.submit = function(){
  var that = this;
  var errors = this.getErrorsObject();
  for(var key in errors){
    this.story[key] = errors[key].val();
  }
  var serialized = this.story.formSerialize();
  var method = this.story_id ? "PUT" : "POST";
  var url = "/stories/" + this.story_id;
  $.ajax(url, {
    dataType: "json",
    data: JSON.stringify(serialized),
    contentType: "application/json; encoding=utf-8",
    method: method,
    success: function(response){
      console.log("Successful submit, redirecting...");
      window.location.href = "/stories/" + response.id;
    },
    error: function(error){
             console.warn("Errors in story submission!");
             console.log(error);
             that.displayErrors(JSON.parse(error.responseText));
           }});
}

StoryForm.prototype.errorBox = function(msg){
  return $("<span>").attr({class: "error"}).append(msg);
}
StoryForm.prototype.displayErrors = function(errors){
  var form = this.getErrorsObject();
  for(var key in errors){
    if(form[key] && errors[key]){
      form[key].before(this.errorBox(key + ": " + errors[key]));
    }
  }
  if(errors.franchises){
    this.franchiseContainer.before(this.errorBox("Franchises: " + errors.franchises));
  }
  if(errors.characters){
    this.franchiseContainer.before(this.errorBox("Characters: " + errors.characters));
  }
  if(errors.ships){
    this.shipContainer.before(this.errorBox("Ships: " + errors.ships));
  }
}
StoryForm.prototype.render = function(){
  var that = this;
  console.log(this.story.franchises);
  this.franchiseContainer.empty();
  this.franchiseContainer.append($("<p>").append("Franchises"));
  this.story.franchises.forEach(function(franchise){
    console.log(franchise);
    var d = new FranchiseCharacterDisplay(franchise, this.story, this);
    this.franchiseContainer.append(d.getBox());
    d.render();
  },this);
  this.franchiseContainer.append(this.suggestor.toggleButton());
  this.renderShips();
}

StoryForm.prototype.renderShips = function(){
  this.shipContainer.empty();
  var that = this;
  this.story.ships.forEach(function(ship, index){
    console.log("Rending ship:");
    console.log(ship);
    var s = new ShipCharacterDisplay(ship, this);
    var label = "Ship #" + (index + 1);
    this.shipContainer.append(s.getBox(label));
    s.render();
  }, this);
  this.shipContainer.append(Ship.addShipButton(this.story,
        function(){that.render()}));

}
StoryForm.prototype.addLoadingBar = function(){
  console.log("Adding loading bar");
  this._loadingBar = $("<progress>").attr({
    value: 0,
    max: 100
  });
  this.container.append(this._loadingBar);
}
$(function(){
  var container = $($("#story-form")[0]);
  if(container){
    id = container.data("story-id");
    var form = new StoryForm(id, container);
    form.takeControl();
  }
});
