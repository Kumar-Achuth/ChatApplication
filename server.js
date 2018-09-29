var express = require("express");
var app = express();
var bodyParser = require("body-parser");
//var router = express.Router();

var mongoose = require('mongoose');
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));
var router = require('./server/router/route')

app.use('/', router);
server.listen(4000);
console.log("Listening to PORT 4000");
app.use(express.static('./public'))

io.on('connection',function(client){
    console.log('Connected')
    client.on('disconnect',function(){
        console.log('Disconnected')
    })
})




