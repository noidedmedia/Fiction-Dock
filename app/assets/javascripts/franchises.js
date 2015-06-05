// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

/*
 * Serialize a franchise obtained via JSON to a real object
 */
function Franchise(obj){
  for(var key in obj){
    if(key == "characters"){
      var characters = obj.characters;
      this.characters = [];
      for(var character in characters){
        this.characters.push(new Character(characters[character]));
      }
    }
    else{
      this[key] = obj[key];
    }
  }
}

Franchise.prototype._baseUrl = function(){
  return "/franchises/" + this.id + "/";
}
Franchise.prototype._charactersUrl = function(){
  return this._baseUrl() + "/characters.json";
}


Franchise.suggest = function(fragment, callback){
  var suc = function(data){
    callback(data);
  }
  $.ajax("/franchises/complete.json?query=" + fragment, {
    dataType: "json",
    success: suc
  });
}
/*
 * Returns all you need to suggest franchises to the user.
 * Append it into your HTML somewhere.
 * callback: called with the franchise when a user makes the selection
 *
 * Due to nested callbacks, this shit is messy as hell
 * 
 * ...
 *
 * Ok, nested callbacks and me being not very good at writing JS.
 */
Franchise.suggestDisplay = function(callback){
  var container = $("<div>").attr({
    class: "franchise-suggestor"
  });
  var inputbox = $("<input>").attr({
    class: "franchise-suggestor-input",
    type: "text"
  });
  var list = $("<ul>").attr({
    class: "franchise-suggestor-list"
  });
  inputbox.keyup(function(event){
    console.log(this);
    console.log(this.value);
    var input = this;
    Franchise.suggest(this.value.trim(), function(franchises){
      list.empty();
      for(var f in franchises){
        var franchise = franchises[f];
        var item = $("<li>").attr({
          class: "franchise-suggestor-item"
        }).append(franchise.name);
        item.click(Franchise._suggestDisplayCallback(input, list, franchise, callback));
        list.append(item);
      }
    });
  })
  container.append(inputbox);
  container.append(list);
  return container;
}

Franchise._suggestDisplayCallback = function(input, list, fr, callback){
  return function(){
    console.log("Selected a franchise suggestion!");
    console.log(fr);
    input.value = "";
    Franchise.getById(fr.id, callback);
    list.empty();
  }
}

Franchise.prototype.destroyCallbackForForm = function(form){
  var fr = this;
  return function(){
    var index = form.story.franchises.indexOf(fr);
    if(index > -1){
      form.story.franchises.splice(index, 1);
    }
    form.render();
  }
}

Franchise.prototype.listDisplay = function(){
  return $("<li>").attr({
    class: 'franchise-list-item franchise-' + this.id
  }).append($("<h3>").append(this.name)).append($("<ul>"));
}
// Takes a callback to be used on delete, returns a form list item
Franchise.prototype.formDisplayBox = function(form){
  var delButton = $("<div>").attr({
    class: "remove-franchise-button"
  }).append("Delete Franchise");
  delButton.click(this.destroyCallbackForForm(form));
  var item = $("<li>");
  item.append(delButton);
  item.append($("<div>").attr({
      class: "franchise-list-name"
    }).append(this.name));
  item.append($("<ul>").attr({
    class: "franchise-list-characters franchise-" + this.id,
  }));
  return item;
}
Franchise.prototype.characters = function(callback){
  var success = function(data, status){
    var ar = [];
    for(var d in data){
      ar.push(new Character(data));
    }
    callback(data);
  };

  $.ajax(this._charactersUrl(), {
    success: success,
    dataType: 'json'
  });
}

Franchise.getById = function(id, callback){
  var success = function(data){
    callback(new Franchise(data));
  }
  $.ajax("/franchises/" + id, {
    dataType: 'json',
  success: success
  });
}
Franchise.all = function(callback){
  var success = function(data, status){
    var ar = [];
    console.log(data);
    for(var d in data){
      ar.push(new Franchise(data[d]));
    }
    callback(ar);
  }
  $.ajax("/franchises/", {
    success: success,
  dataType: "json"
  });
}

