var express = require('express');
var router = express.Router();
var app = express();
var users = require('../controller/userscontrroller')
router.post("/login", users.login);
router.put("/login", users.login)
router.post('/register', users.registration);
app.use('/', router);

// ConnectDB();

module.exports = router;