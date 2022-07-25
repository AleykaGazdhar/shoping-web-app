const express = require("express");
const router = express.Router();
const Users = require("../controllers/usersController");
router.post("/signup", Users.doSignUp);
router.post("/signin", Users.doSignIn);
router.post('/activate', Users.activate);
router.post('/authentication', Users.authentication);
router.post("/addPreference", Users.doSignUp);
router.get('/logout', Users.logout);
router.post('/updatePassword', Users.updatePassword);
router.post('/forgotPassword', Users.forgotPassword);
module.exports = router;