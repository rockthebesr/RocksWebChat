var socket = io();
var name = null;

function getRandomColor() {
  var letters = 'BCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

var color = getRandomColor();
socket.on('connect', function (data) {
  socket.emit('join', 'Hello server from client');
});

socket.on('chat message', function (msg) {
  var lastMsgName = $(".message-name")
    .last()
    .text();
  var msgName = msg.user;
  var msgColor = msg.color;
  var message = msg.message;
  if (lastMsgName === msgName) {
    var innerHtml = "<div class='message-message'>" + message + "</div>"
    $("li")
      .last()
      .append(innerHtml);
  } else {
    var innerHtml = "<div class='message-name'>" + msgName + "</div><div class='message-message'>" + message + "</div>";
    var li = $('<li>').html(innerHtml);
    if (msgName != name) {
      li.css("background", msgColor);
    }

    $('#thread').append(li);
  }

});

socket.on('counts', function (counts) {
  $(".counts-message").text(counts + " people in the chat room");
})

// sends message to server, resets & prevents default form action
$('#message-send-btn').click(function () {
  var message = $('#message').val();
  socket.emit('messages', {
    user: name,
    color: color,
    message: message
  });
  $('#message').val("");
  return false;
});

$('#message').keydown(function (e) {
  var key = e.which;
  if (key == 13) {
    $('#message-send-btn').click();
    e.preventDefault();
  }
});

$('#myModal').on('hidden.bs.modal', function (e) {
  var nameInput = $("#nameInput").val();
  if (!nameInput) {
    e.preventDefault();
  } else {
    name = nameInput;
    sessionStorage.setItem("rocksWebChatName", name);
    $("#welcomeMessage").text("Hi " + name + ", welcome!")
  }
});

$(window).on('load', function () {
  var chatName = sessionStorage.getItem("rocksWebChatName")
  if (!chatName) {
    $('#myModal').modal('show');
  } else {
    name = chatName;
    $("#welcomeMessage").text("Hi " + name + ", welcome!")
  }
});
