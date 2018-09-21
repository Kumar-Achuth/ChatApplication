var mongoose = require("mongoose");
//var connect= require('../config/config');
mongoose.connect('mongodb://localhost:27017/demoDb', { useNewUrlParser: true });
// create instance of Schema
var mongoSchema = mongoose.Schema;
// create schema
var userSchema = new mongoSchema({
        'fname': {
                type: String,
                required: true
        },
        'mname': {
                type: String,
                required: true
        },
        'lname': {
                type: String,
                required: true
        },
        'age': {
                type: Number,
                min: 18,
                required: true
        },
        'mobile': {
                type: Number,
                required: true
        },
        'email': {
                type: String,
                required: true
        },
        'password': {
                type: String,
                required: true
        }
});
// create model if not exists.
module.exports = mongoose.model('userLogin', userSchema);