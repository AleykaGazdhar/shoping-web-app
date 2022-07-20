import Users from '../controllers/usersController';
import { Router } from 'express';
const userRouter = Router();

userRouter.post("/doSignUp", Users.doSignUp);
userRouter.post("/doLogin", Users.doLogin);
userRouter.get('/logout', Users.logout);
/* userRouter.post("/emailAlreadyExists", Users.emailAlreadyExists);
userRouter.get("/getUsersList", Users.getUsersList);
userRouter.post('/authentication', Users.authentication);
userRouter.post('/searchUserData', Users.searchUserData);
userRouter.post('/forgotPassword', Users.forgotPassword);
userRouter.post('/getUserInfo', Users.getUserInfo); */
// module.exports = userRouter;

export default userRouter