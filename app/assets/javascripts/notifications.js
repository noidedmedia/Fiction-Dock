$(function(){
  $(".notification-item").click(function(event){
    console.log("marking #" + this.dataset.id + "as read");
    $.ajax({
      type: "POST",
      url: "/notifications/" + this.dataset.id + "/read", 
      success: function(){
        console.log("Marked as read");
      },
      dataType: "json"
    });
  })
})
