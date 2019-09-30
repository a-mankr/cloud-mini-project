// also, include the toastlikemessage.css file

// show toast Notification
function toastMessage(message) {
  $(".toastlikemessage")
    .text(message)
    .stop()
    .fadeIn(400)
    .delay(3000)
    .fadeOut(400); //fade out after 3 seconds
}
