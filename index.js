var app = require("express")();
var http = require("http").createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
    console.log('a user connected ' + socket.id);
    
    socket.on('welcome', function(username) {
        io.emit('welcome', username);
    });

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
});


http.listen(3000, function() {
    console.log("Listening on port 3000");
});

