// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//
function Character(obj){
  for(var key in obj){
    this[key] = obj[key];
  }
}
