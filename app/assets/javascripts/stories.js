/*
 * When you write JavaScript at 11:00 at night, bad things happen
 * This is one of those things
 * Basically, this is a way-too-complicated object which manages the new story form. 
 * Or, at least, the franchise selection portion.
 * The characters selection protion communicates with this to find characters.
 */

function StoryForm(franchises){
  this.franchises = franchises;
  this.container = $("#story-franchises-forms-container");
  this.box = $("#franchise-input-box");
  this.suggestBox = $("#franchise-input-suggest-box");
  this.franchiseDisplay = $("#current-franchises-list");
}
StoryForm.prototype.setCallbacks = function(){
  var that = this;
  this.box.keyup(function(event){
    console.log(event);
    if(event.which == 13){
      that.addFranchiseByName(this.text());
    }
    else
    that.franchiseSuggest();
  });
}

StoryForm.prototype.franchiseSuggest = function(){
  var s = this.franchisesWithPrefix(this.box.text().trim().toLowerCase());
  this.suggestBox.empty();
  console.log(s);
  for(var i in s){
    var elem = $("<li>");
    elem.append(s[i].name);
    elem.click(this._makeCallback(s[i]));
    this.suggestBox.append(elem);
  }
}

StoryForm.prototype._makeCallback = function(franchise){
  var that = this;
  return function(event){
    console.log(that)
     that.addFranchise(franchise);
     that.render();
     that.clearList();
  };
}
StoryForm.prototype.clearList = function(){
  this.suggestBox.empty();
}
StoryForm.prototype.franchisesWithPrefix = function(prefix){
  console.log("Prefix is: " + prefix);
  var r = []; // Empty array to keep the results
  for(var f in this.allFranchises){
    var franchise = this.allFranchises[f];
    console.log("Checking against franchise with name: " + franchise.name);
    var prepped = franchise.name.toLowerCase().trim();
    console.log("Prepped is: " + prepped);
    console.log("Slice is: '" + prepped.slice(0, prefix.length) + "'");
    if(prepped.slice(0, prefix.length) == prefix){
      console.log("Succesfully appending!");
      r.push(franchise);
    }
  }
  console.log("Array is");
  console.log(r); 
  return r;
}
StoryForm.prototype.addFranchiseByName = function(name){
  console.log("Adding by name: " + name);
  for(var i in this.allFranchises){
    if(this.allFranchises[i].name == name){
      this.addFranchise(name);
    }
  }
}

StoryForm.prototype.addFranchise = function(franchise){
  if(this.franchises.indexOf(franchise) == -1){
    this.franchises.push(franchise);
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
  this.container.empty();
  this.franchiseDisplay.empty();
  for(var f in this.franchises){
    var franchise = this.franchises[f];
    console.log("Trying to add franchise to form");
    console.log(franchise);
    var input = $("<input>").attr({
      type: 'hidden',
      name: 'story[franchise_ids][]',
      class: 'franchise-id-input',
      value: franchise.id
    });
    this.container.append(input);
    
  }
}

// Setup a story form
// Runs the `after` callback when finished
StoryForm.prototype.setup = function(after){
  // First we grab the franchises already added
  var that = this;
  var inputs = this.container.children(".franchise-id-input");
  console.log(inputs);
  inputs.each(function(index, input){
    console.log(input.value);
    Franchise.getById(input.value, function(fr){
      console.log(that);
      that.addFranchise(fr);
    });
  });
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
