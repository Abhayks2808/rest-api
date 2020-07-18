const express = require('express');
const router = express.Router();

const Usercontroller = require('../controllers/user')


router.post('/signup',Usercontroller.user_registeruser); 


router.post('/login',Usercontroller.user_loginuser);



module.exports = router;