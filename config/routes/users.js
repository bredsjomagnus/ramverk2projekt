var express = require('express');
var router = express.Router();
// var navbarjson = require('../navbar.json');
var userController = require('../../src/Users/userController');

/* GET POST loginpage. */
router.get('/login', userController.loginPage);
router.post('/login', userController.loginPage);

router.get('/logout', userController.logoutProcess);

/* GET POST newuserpage  */
router.get('/newuser', userController.newUserPage);
router.post('/newuserprocess', userController.newUserProcessPage);

router.get('/players', userController.viewPlayersPage);

router.get('/delete/:id', userController.deleteProcess);

module.exports = router;
