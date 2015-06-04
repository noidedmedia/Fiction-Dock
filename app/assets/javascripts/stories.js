/* 
 * The story form is basically 100% JavaScript. 
 * I basically can't think of any way to do this unobtrusively.
 * I tried——look in the commit history, it was terrible
 */
function StoryForm(){
  this.container = $("#story-form");
  this.storyId = this.container.data("story-id");
  console.log(this.storyId);
}

StoryForm.prototype.takeControl = function(){

}
$(function(){
  if(document.getElementById("story-form")){
    var form = new StoryForm();
    form.takeControl();
  }
});
