
var Express = require('express');
var app = Express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use("/public/js", Express.static(__dirname + '/public/js'));
app.use("/public/styles", Express.static(__dirname + '/public/styles'));
app.use("/public/styles", Express.static(__dirname + '/node_modules/bootstrap/dist/css'));


io.on('connection', function(socket){
  socket.on('messages', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
