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
}

StoryForm.prototype.finishedControl = function(){
  this._loadingBar.remove();
  console.log("Control taken!");
  console.log(this);
  this.innerContainer = $("<div>").attr({
    id: "javascript-form-elements"
  });
  this.shipContainer = $("<div>").attr({id: "javascript-ship-list"});
  this.container.append(this.innerContainer);
  this.container.append(this.shipContainer);
  this.suggestor = new FranchiseSuggest(this.story, this);
  this.render();
}

StoryForm.prototype.render = function(){
  var that = this;
  console.log(this.story.franchises);
  this.innerContainer.empty();
  this.story.franchises.forEach(function(franchise){
    console.log(franchise);
    var d = new FranchiseCharacterDisplay(franchise, this.story, this);
    this.innerContainer.append(d.getBox());
    d.render();
  },this);
  this.innerContainer.append(this.suggestor.toggleButton());
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
    var id;
    if(id = container.data("story-id")){
      var form = new StoryForm(id, container);
      form.takeControl();
    }
  }
});
