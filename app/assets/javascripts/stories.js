function StoryForm(franchises){
  this.franchises = franchises;
  this.container = $("#story-franchises-forms-container");
  this.box = $("#franchise-input-box");
}
StoryForm.prototype.setCallbacks = function(){
  var that = this;
  console.log("Setting callbacks");
  console.log(this.box);
  this.box.keydown(function(event){
    console.log(event);
    if(event.which == 13){
      that.addByName(this.innerText);
    }
  });
}
StoryForm.prototype.addByName = function(name){
  console.log("Adding by name: " + name);
  for(var i in this.allFranchises){
    if(this.allFranchises[i].name == name){
      this.franchises.append(name);
    }
  }
}
StoryForm.prototype.takeControl = function(){
  var that = this;
  console.log("ASSUMING DIRECT CONTROL");
  this.setup(function(){
    that.setCallbacks();
  });
}
// Render the form elements
StoryForm.prototype.render = function(){
  for(var f in franchises){
    var franchise = franchises[f];
    this.container.children(".franchise-input-id").empty();
    this.container.append($("<input>").attr({
      type: 'hidden',
      name: 'story[francises-attributes][' + f + '][id]',
      class: 'franchise-input-id',
      value: franchise.id
    }));
  }
}

// Setup a story form
// Runs the `after` callback when finished
StoryForm.prototype.setup = function(after){
  // First we grab the franchises already added
  var that = this;
  var inputs = this.container.children(".franchise-input-id");
  for(var i in inputs){
    Franchise.getById(i, function(fr){
      that.franchises.append(fr);
    });
  }
  // Now we grab a list of all franchises to make our life easier
  Franchise.all(function(all){
    console.log("Acquiring all franchises");
    that.allFranchises = all;
    after();
  });
}
$(function(){
  if($("#story-franchises-forms-container").length != 0){
    c = new StoryForm([]);
    c.takeControl();
  }
});
