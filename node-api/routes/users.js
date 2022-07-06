const express = require("express");
const router = express.Router();
const Users = require("../controllers/usersController");
router.post("/doSignUp", Users.doSignUp);
router.post("/doLogin", Users.doLogin);
router.get('/logout', Users.logout);
/* router.post("/emailAlreadyExists", Users.emailAlreadyExists);
router.get("/getUsersList", Users.getUsersList);
router.post('/authentication', Users.authentication);
router.post('/searchUserData', Users.searchUserData);
router.post('/forgotPassword', Users.forgotPassword);
router.post('/getUserInfo', Users.getUserInfo); */
module.exports = router;