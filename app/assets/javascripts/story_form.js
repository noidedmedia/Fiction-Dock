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
        that._loadingBar.attr({value: progress*100});
      });
    })
  }
}

StoryForm.prototype.finishedControl = function(){
  this._loadingBar.remove();
  console.log("Control taken!");
  console.log(this);
  this.innerContainer = $("<div>").attr({
    id: "javascript-form-elements"
  });
  this.container.append(this.innerContainer);
  this.render();
}

StoryForm.prototype.render = function(){
  this.innerContainer.empty();
  this.story.franchises.forEach(function(franchise){
    var d = new FranchiseCharacterDisplay(franchise, this.story);
    this.innerContainer.append(d.getBox());
    d.render();
  },this);
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
    var id;
    if(id = container.data("story-id")){
      var form = new StoryForm(id, container);
      form.takeControl();
    }
  }
});
