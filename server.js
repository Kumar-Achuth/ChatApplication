var express = require("express");
var app = express();
var bodyParser = require("body-parser");
//var router = express.Router();
var users = require("./server/controller/userscontrroller")
var mongoose = require('mongoose');
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));
var router = require('./server/router/route')

app.use('/', router);
app.use(express.static('./public'))

io.on('connection',function(client){
    console.log('Connected')


    // socket.broadcast.emit('message', 'Another client has just connected!');


    client.on('disconnect',function(){
        console.log('Disconnected')
    })
    client.on('tobackend',function (data) {
        users.addtodb( data.userid, data.message, data.date, data.username);
        io.emit('tofrontend',data)
    })
    
io.sockets.on('connection', function (socket) {
    socket.on('join', function (data) {
      socket.join(data.username); // We are using room of socket io
    });
  })
  client.on('tosingleperson',function(data){
      users.singleaddtodb(data.senderName, data.recieverName, data.message, data.senderId, data.recieverId)
      io.emit(data.recieverId,data)
  })  
})
server.listen(4000);
console.log("Listening to PORT 4000");