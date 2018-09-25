var express = require('express');
var router = express.Router();
var app = express();
var users = require('../controller/userscontrroller')

const { check, validationResult } = require('express-validator/check');

var usermod = require('../model/users');
// var validator=require('express-validator');
var db = new usermod();
var response = {};

router.post('/login', [
    check('email').isEmail(),
    check('password').isLength({ min: 3 })
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    db.email = req.body.email;
    db.password = require('crypto')
        .createHash('sha1')
        .update(req.body.password)
        .digest('base64');
    usermod.find({ "email": db.email, "password": db.password }, function (err, result) {
        console.log("result: " + result);
        if (err) {
            response = {
                "Success": false,
                "message": "error fetching data"
            };
            return res.status(400).send(err);
        }
        else {
            if (result.length > 0) {
                var response = {
                    "Success": true,
                    "message": "Login successfull"
                };
                return res.status(200).send(response);
            }
            else {

                var response = {
                    "Success": true,
                    "message": "Username/Password Incorrect"
                };
                return res.status(401).send(response);
            }
        }
    });
});
router.post('/register', [
    check('firstname').isLength({ min: 3 }).isAlpha(),
    check('lastname').isLength({ min: 3 }).isAlpha(),
    check('mobile').isMobilePhone("en-IN"),
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    db.firstname = req.body.firstname;
    db.lastname = req.body.lastname;
    db.mobile = req.body.mobile;
    var number = req.body.mobile;
    db.email = req.body.email;
    // Hash the password using SHA1 algorithm.
    db.password = require('crypto')
        .createHash('sha1')
        .update(req.body.password)
        .digest('base64');
    //var mail = req.body.email;
    usermod.find({ "email": db.email }, function (err, data, ) {
        if (data.length > 0) {
            response = {
                "error": false,
                "message": "User Email id already exists ",
            }
            return res.status(404).send(response);

        }
        if (err) {
            response = {
                "error": true,
                "message": "There was a error fetching the data "
            }
            return res.status(404).send(response);
        }
        else {
            // console.log(db.email)
            // console.log(db.firstname)
            db.save(function (err) {
                if (err) {
                    response = {
                        "error": true,
                        "message": "There was a error storing the data "
                    }
                }
                else {
                    response = { "error": false, "message": "User Has been successfully registered. Data has been successfully added to the database  " }
                }
                return res.status(202).send(response);
            });
        }
    });

});
app.use('/', router);

// ConnectDB();

module.exports = router;