var mongoose = require("mongoose");
//var connect= require('../config/config');
mongoose.connect('mongodb://localhost:27017/demoDb', { useNewUrlParser: true });
// create instance of Schema
var mongoSchema = mongoose.Schema;
// create schema
var singleChatSchema = new mongoSchema({
    'senderName': {
        type: String,
        required: true
    },
    'recieverName': {
        type: String,
        required: true
    },
    'message': {
        type: String,
        required: true
    },
    'date': {
        type: Date,
        required: true
    },
    'senderId': {
        type: String,
        required: true
    },
    'recieverId': {
        type: String,
        required: true
    }
});
// create model if not exists.
module.exports = mongoose.model('singleschat', singleChatSchema);