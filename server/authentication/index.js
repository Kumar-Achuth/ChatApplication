var jwt = require('jsonwebtoken');
const object = ("../config/auth.js");
secret = object.secret;
console.log(secret)
var auth = function (req, res, next) {
    //next();
    var token = req.headers["token"];
    var respo = {
        'message': "Unauthorised Entry "
    };
    console.log("in auth ", token);
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            console.log(err)
            return res.status(401).send(respo);
        }
        else {
            console.log(decoded);
            next();
        }
    });
    //next();
}
module.exports = auth;