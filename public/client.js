var socket = io.connect('http://localhost:7777');
socket.on('connect', function(data) {
    socket.emit('join', 'Hello server from client');
});
