const express = require('express');
const { getSignupPage, getLoginPage, addUserToDb, logUserIn, logUserOut } = require('./../controllers/auth.js')
const router = express.Router();

router.route('/signup').get(getSignupPage).post(addUserToDb);
router.route('/login').get(getLoginPage).post(logUserIn);
router.route('/logout').get(logUserOut);

module.exports = router;
