$(function() {
  // Links inside the Notification item will not redirect when clicked.
  $(".notification-item a").click(function(e) {
    e.stopPropagation();
  });

  // Marks the notification as read and redirects to the subject path.
  $(".notification-item").click(function(event) {
    console.log("Marking #" + this.dataset.id + " as read");
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/notifications/" + this.dataset.id + "/read",
      success: function() {
        // On success, redirect to the subject path.
        var path = this.dataset.subjectpath;
        Turbolinks.visit(path);
      }.bind(this)
    });
  })
});
