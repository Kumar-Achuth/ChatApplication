var express = require("express");
var app = express();
var bodyParser = require("body-parser");
//var router = express.Router();

var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));
var router = require('./server/router/route')

app.use('/', router);
app.listen(4000);
console.log("Listening to PORT 4000");





app.use(express.static('./public'))
var path = require('path');
var server = require('http').createServer(app);
app.use('/', express.static(path.join(__dirname, '/UI')));
var io = require('socket.io')(server);
io.on('connection', function(client) {
    client.on('disconnect', function() {
    console.log("disconnected")
    });
    client.on('room', function(data) {
        client.join(data.roomId);
        console.log(' Client joined the room and client id is '+ client.id);

    });
    client.on('toBackEnd', function(data) {
               client.in(data.roomId).emit('message', data);
    })
});
server.listen(3000);