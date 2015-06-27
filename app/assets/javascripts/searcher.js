function SearchControls(container){
  this.search = new Story({});
  this.container = container;
  this.search.addShip(new Ship({}));
}

SearchControls.prototype.takeControl = function(){
  this.suggest = new FranchiseSuggest(this.search, this);
  this.franchiseContainer = $("<div>");
  this.shipContainer = $("<div>");
  this.container.append(this.franchiseContainer);
  this.container.append(this.shipContainer);
  this.container.append(this.submitButton());
  this.render();
}

SearchControls.prototype.render = function(){
  console.group();
  console.debug("Rendering SearchControls:",this);
  this.franchiseContainer.empty();
  this.search.franchises.forEach(function(franchise){
    console.debug("Attempting to render a franchise in search:",
      franchise,
      "in SearchControls:",
      this);
    var disp = new FranchiseCharacterDisplay(franchise, this.search, this);
    this.franchiseContainer.append(disp.getBox());
    disp.render();
  }, this);
  this.franchiseContainer.append(this.suggest.toggleButton());
  this.renderShips();
  console.groupEnd();
}
SearchControls.prototype.renderShips = function(){
  this.shipContainer.empty();
  console.group();
  console.debug("Rendering ships in search form...");
  console.debug("this:", this);
  var ship = this.search.ships[0];
  var disp = new ShipCharacterDisplay(ship, this);
  console.log("Ship character display is:", disp);
  this.shipContainer.append(disp.getBox());
  disp.render();
}
SearchControls.prototype.submitButton = function(){
  var that = this;
  var btn = $("<button>").attr({class: 'search-submit'}).append("submit");
  btn.click(function(event){
    event.preventDefault();
    that.submit();
  });
  return btn;
}

SearchControls.prototype.submit = function(){
  var toSubmit = {};
  toSubmit.characters = this.search.characters.map(function(c){return c.id});
  toSubmit.franchises = this.search.franchises.map(function(f){return f.id});
  toSubmit.ships = this.search.ships[0].characters.map(function(c){return c.id});
  console.debug("Attempting to submit a search in SearchControls:",
      this,
      "with search object:",
      toSubmit,
      "which serialized to params:",
      params);
  var params = $.param(toSubmit);
  window.location.href = "/stories/search?" + params;
}
$(function(){
  var container = $("#search-controls");
  var ctls = new SearchControls(container);
  ctls.takeControl();
});
