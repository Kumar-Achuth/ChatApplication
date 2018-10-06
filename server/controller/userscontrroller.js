exports.login = function (req, res) {
    const { check } = require('express-validator/check')
    var usermod = require('../model/users');
    var db = new usermod();
    var response = {};
    db.email = req.body.email;
    // var mail = req.body.email;
    check('mail').isEmail()
    var password = require('crypto')
        .createHash('sha1')
        .update(req.body.password)
        .digest('base64');
    // var pass = password;

    usermod.find({ "email": db.email, password: password }, function (err, result) {
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
}
exports.registration = function (req, res) {
    var usermod = require('../model/users');
    var db = new usermod();
    var response = {};
    // const { check } = require('express-validator/check')
    db.email = req.body.email;
    var mail = req.body.email;
    check(mail).isEmail()
    // Hash the password using SHA1 algorithm.
    db.password = require('crypto')
        .createHash('sha1')
        .update(req.body.password)
        .digest('base64');
    db.firstname = req.body.firstname;
    // check(firstname).isUppercase();
    db.lastname = req.body.lastname;
    // check('lastname ').isUppercase();
    db.mobile = req.body.mobile;

    // var password = req.body.password
    usermod.find({ "email": mail }, function (err, data) {
        if (data.length > 0) {
            response = {
                "error": false,
                "message": "User already has a account",
            }
            return res.status(404).send(response);
        }
        if (err) {
            response = {
                "error": true,
                "message": "Error retrieving data"
            }
            return res.status(404).send(response);
        }
        else {
            db.save(function (err) {
                if (err) {
                    response = {
                        "error": true,
                        "message": "error storing data"
                    }
                }
                else {
                    response = { "error": false, "message": "data added" }
                }
                return res.status(202).send(response);
            });
        }
    });
}
exports.listOfUsers = function (req, res) {
    // return res.status(200).send("all good");
    var auth = require("../router/authRouter.js")
    var userModel = require('../model/users');
    var response = {};
    var arrList = [];
    var userid = req.params.id;
    userModel.find({ "_id": { $ne: userid } }, function (err, data) {
        console.log(data);
        for (key in data) {
            arrList.push({
                email: data[key].email,
                name: data[key].firstname + ' ' + data[key].lastname,
                userid: data[key]._id
            });
        }
        if (err) {
            response = {
                "error": true,
                "message": "Error Fetching data"
            }
        }
        else {
            response = {
                "error": false,
                "message": arrList
            }
        }
        return res.status(200).send(response);
    })
}
exports.addtodb = function (userid, message, date, username) {
    var userModel = require('../model/message');
    var db = new userModel();
    var response = {};
    db.userid = userid;
    db.message = message;
    db.date = date;
    db.username = username;
    db.save(function (err) {
        if (err) {
            response = {
                "error": true,
                "message": "Error storing data"
            }
        }
        else {
            response = { "error": false, "message": "Succesfully added to database"}
        } 
    });
    console.log(response)
}
exports.getmsgs = function (req, res) {
    var userModel = require('../model/message');
    var response = {};
    userModel.find({}, function (err, data) {
        if (data) {
            response = {
                "error": false,
                "message": data,
            }
            res.status(200).send(response);
        }
        else {
            response = {
                "error": true,
                "message": "Something went wrong",
            }
            console.log(err);
            res.status(401).send(response);
        }
    })
}
// exports.singleaddtodb = function (senderName,recieverName,message,date,senderId,recieverId) {
//     var userModel = require('../model/singlesChat');
//     var db = new userModel();
//     var response = {};
//     db.senderName = senderName;
//     db.recieverName= recieverName;
//     db.message = message;
//     db.date = date;
//     db.senderId= senderId;
//     db.recieverId=recieverId;
//     db.save(function (err) {
//         if (err) {
//             response = {
//                 "error": true,
//                 "message": "Error storing data"
//             }
//         }
//         else {
//             response = { "error": false, "message": "Succesfully added to database"}
//         } 
//     });
//     console.log(response)
// }
// exports.getSingleMessages = function (req, res) {
//     var userModel = require('../model/singlesChat');
//     var response = {};
//     var recieverId=req.params.recieverId;
//     var senderId=req.params.senderId;
//     userModel.find({$or : [{ "senderId" : senderId, "recieverId" : recieverId },{"recieverId": recieverId,"senderId":senderId}]}, function (err, data) {
//         if (data) {
//             response = {
//                 "error": false,
//                 "message": data,
//             }
//             res.status(200).send(response);
//         }
//         else {
//             response = {
//                 "error": true,
//                 "message": "Something went wrong",
//             }
//             console.log(err);
//             res.status(401).send(response);
//         }
//     })
// }







exports.peerMessages=function(senderId,senderName,receiverId,receiverName,message,date){
    var messageMod=require('../model/singlesChat');
    var msgdb=new messageMod();
    var response={};
    msgdb.senderId=senderId;
    msgdb.senderName= senderName;
    msgdb.receiverId= receiverId;
    msgdb.receiverName= receiverName;
    msgdb.message= message;
    msgdb.date=date;
    // console.log(username);

    msgdb.save(function (err) {
        
        if (err) {
            response = {
                "Success": false,
                "message": "Error adding data",
                "err": err
            };
        } else {
            response = {
                "Success": true,
                "message": "Successfully Sent"
            };
        }
        console.log(response);
        
    });
}
exports.singleChatList= function(req,res)
{
    var messageMod=require('../model/singlesChat');
    
    var response={};
    var receiverId=req.params.receiverId;
    var senderId=req.params.senderId;
    messageMod.find({$or:[{'receiverId':receiverId,'senderId':senderId},{'senderId':receiverId,'receiverId':senderId}]}, function(err,result){
        if (err) {
            response = {
                "Success": false,
                "message": "Error fetching data"
            };
            return res.status(404).send(err);
        } else {
            response={
                "Success": true,
                "message": result
            }
            
        }
            return res.status(200).send(response);
    });
}
            






