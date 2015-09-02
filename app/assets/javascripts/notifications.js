$(function() {
  // Marks the notification as read and redirects to the subject path.
  $(".notification-item").click(function(e) {
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
  });

  // Links inside the Notification item will not redirect when clicked.
  $(".notification-item a").click(function(e) {
    e.stopPropagation();
  });

  $("#header-notifications > .header-item-title a").click(function(e) {
    e.preventDefault();
  });

  $(".notification-item .mark-as-read").click(function(e) {
    e.stopPropagation();

    // Marks as read, then modifies the class of the notification item.
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/notifications/" + this.parentNode.dataset.id + "/read",
      success: function() {
        $(this.parentNode).addClass("notification-read-animate");
      }.bind(this)
    });
  });
});
