function FranchiseSuggest(container, renderer){
  this.container = container;
  this.renderer = renderer;
}

FranchiseSuggest.prototype.toggleButton = function(){
  var that = this;
  var btn = $("<button>").attr({
    class: "franchise-toggle-button"
  });
  btn.append("Add a Franchise");
  btn.click(function(){
    console.log("Add a franchise button clicked");
    console.log(that);
    $(btn).replaceWith(that.display());
  });
  return btn;
};

FranchiseSuggest.prototype.display = function(){
  var that = this;
  this.box = $("<div>");
  var input = $("<input>").attr({type: "text"});
  input.on("input", function(){
    var val = input.val();
    $.ajax("/franchises/complete.json?query=" + val, {
      dataType: "json",
      success: function(data){
        console.log("That is:");
        console.log(that);
        that.displayList(data);
      }
    });
  });
  this.box.append(input);
  this.list = $("<ul>").attr({class: "franchise-suggestions"});
  this.box.append(this.list);
  console.log("this.box is:");
  console.log(this.box);
  console.log("children are:");
  console.log(this.box.children());
  return this.box;
};

FranchiseSuggest.prototype.displayList = function(data){
  var that = this;
  this.list.empty();
  console.log("Got data:");
  console.log(data);
  
  data.forEach(function(franc){
    console.log("Appending franchise to suggest list:");
    console.log(franc);
    var item = $("<li>").append(franc.name);

    item.click(function(){
      console.log("list item clicked");

      Franchise.byId(franc.id, function(fr){
        console.log("Got franchise with id:");
        console.log(fr);
        that.container.addFranchise(fr);
        
        if(that.renderer){
          console.log("Rendering renderer:");
          console.log(that.renderer);
          that.renderer.render();
        }
      })
    });

    console.log("item is:");
    console.log(item);
    this.list.append(item);
  }, this);
};
