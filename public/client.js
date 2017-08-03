var socket = io();
socket.on('connect', function(data) {
    socket.emit('join', 'Hello server from client');
});

socket.on('chat message', function(msg){
  $('#thread').append($('<li>').text(msg));
  window.scrollTo(0, document.body.scrollHeight);
});

// sends message to server, resets & prevents default form action
$('form').submit(function() {
  var message = $('#message').val();
  socket.emit('messages', message);
  this.reset();
  return false;
});
