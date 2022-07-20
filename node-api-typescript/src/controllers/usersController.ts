import Users from '../models/usersModel';

const globalService = require("../core/globalService");
var jwt = require('jsonwebtoken');

require("dotenv").config();
export default {
  doSignUp : async (req: any, res: any) => {
    const postData = req.body;
    console.log("postData:", postData)
    if (postData.password) {
      postData.password = globalService.encryptString(postData.password);
    }
  
    if (postData._id) {
      postData.updatedAt = new Date();
     
      Users.updateOne({
          _id: postData._id,
        },
        postData,
        (err: any, resp: any) => {
          if (err) {
            return res.json({
              status: 500,
              message: "There are some error while update.",
              data: err,
            });
          } else {
            if (!postData.password) {
              req.session.currentUser = postData;
            } else {
              req.session.destroy();
            }
            let checkPassword = postData.password;
            delete postData.password;
            return res.json({
              status: 200,
              message: checkPassword ?
                "Your password has been changed successfully." : "User Profile Updated successfully.",
              data: postData,
            });
          }
        }
      );
    } else {
      const addUser: any = new Users();
      Object.keys(postData).forEach((key) => {
        addUser[key] = postData[key];
      });
      try {
        var userResp = await addUser.save();
        console.log("userResp========", userResp);
        if (userResp) {
          return res.json({
            message: "User Account Created Successfuly.",
            status: 200,
            data: userResp,
          });
        } else {
          return res.json({
            message: "Failed to create account.",
            status: 500,
            error: "Getting issue while creating user account.",
          });
        }
      } catch (error) {
        console.log("error========", error);
        return res.json({
          message: "Failed to create an user account.",
          status: 500,
          error: error.message,
        });
      }
    }
  },
  
  doLogin : async (req: any, res: any) => {
    const postData = req.body;
   /**  console.log('postData :', postData)*/
    postData.email = postData.email.toLowerCase();
    process.env.HOST_NAME = "http://" + req.headers.host + "/";
    process.env.WEBSITE_URL = "http://" + req.headers.host + "/#/";
    postData.password = globalService.encryptString(postData.password);
    if (postData.email) {
      // delete postData.password;
      delete postData.remember;
      try {
        let userDetails: any = await Users.findOne(postData);
        if (userDetails) {
          var token = jwt.sign({
            _id: userDetails._id
          }, process.env.JWT_SECRETKEY, {
            expiresIn: process.env.TOKEN_EXPIRE // expires in 24 hours 1h, 5m, "10h", "7d"
          });
          // console.log("process.env.TOKEN_EXPIRE======", process.env.TOKEN_EXPIRE)
          userDetails = JSON.parse(JSON.stringify(userDetails));
          userDetails.authorization = token;
          req.session.currentUser = userDetails;
          delete userDetails.password;
          return res.json({
            message: "You have signin successfully!",
            status: 200,
            data: userDetails,
          });
        } else {
          return res.json({
            message: "Please provide valid email or password.",
            status: 400,
          });
        }
      } catch (error) {
        return res.json({
          message: "Please provide valid email or password.",
          status: 500,
          error: error,
        });
      }
    } {
      return res.json({
        message: "Please provide valid email or password.",
        status: 400,
      });
    }
  },
  
  getUsersList : async (req: any, res: any) => {
    try {
      const data = await Users.find();
      return res.json({
        status: 200,
        message: "Get the user list successfully.",
        data: data,
      });
    } catch (error) {
      return res.json({
        status: 500,
        message: "Some error occrred.",
        data: error,
      });
    }
  },
  
  emailAlreadyExists : async (req: any, res: any) => {
    var postData = req.body;
    try {
      const emailExitResp = await Users.findOne({
        email: postData.email,
      });
      if (emailExitResp) {
        return res.json({
          status: 200,
          message: "This Email Already Exists, please try another one.",
          data: emailExitResp,
        });
      } else {
        return res.json({
          status: 500,
          message: "No Email Found.",
          data: emailExitResp,
        });
      }
    } catch (error) {
      return res.json({
        status: 500,
        message: "No Email Found.",
        data: error,
      });
    }
  },
  
  forgotPassword : (req: any, res: any) => {
    var postData = req.body;
    postData.email = postData.email.toLowerCase();
    const email = postData.email;
    if (email) {
      var whereObj = {
        email: postData.email,
      };
    Users.findOne(whereObj, (err: any, user: any) => {
        if (user) {
          // moment(new Date(date)).format('YYYY-MM-DD');
  
          const rString = globalService.generateString();
        Users.updateOne({
              _id: user._id,
            }, {
              forgotLink: rString,
              forgotStatus: 1,
            },
            (err: any, forgotResp: any) => {
              if (forgotResp) {
                const linkParam =
                  process.env.WEBSITE_URL +
                  "recoverpassword/" +
                  user._id +
                  "/" +
                  rString;
                var prepareEmailConfig = {
                  email: user.email,
                  firstName: globalService.capitalize(user.firstName),
                  markerData: {
                    name: globalService.capitalize(user.firstName),
                    websiteUrl: process.env.WEBSITE_URL,
                    recoverPasswordLink: linkParam,
                    fristname: user.firstName,
                  },
                  templatePath: "public/assets/emailtemplates/forgot-password.html",
                  subject: "Reset your password for AM.ONLINE your account",
                  html: "",
                  templateName: "forgot-password", // NEW
                };
  
                globalService.prepareEmailData(
                  prepareEmailConfig,
                  (err: any, resp:any) => {
                    return res.json({
                      status: 200,
                      message: "Please check your email, Reset password link has been sent to " +
                        user.email +
                        ".",
                      data: resp,
                    });
                  }
                );
              } else {
                return res.json({
                  status: 500,
                  message: "No account found with this email address : " + email + ".",
                });
              }
            }
          );
        } else {
          return res.json({
            status: 500,
            message: "No account found with this email address : " + email + ".",
          });
        }
      });
    } else {
      return res.json({
        status: 500,
        message: "No account found with this email address : " + email + ".",
      });
    }
  },
  
  authentication : (req: any, res: any) => {
    if (req.headers && req.headers.authorization) {
      const authorization = req.headers.authorization.split(" ")[1];
      globalService.verifyToken(authorization, (verifyResp: any) => {
        if (verifyResp.verify) {
          return res.json({
            status: 200,
            message: "Api authenticated Successfully.",
            currentUser: true,
          });
        } else {
          return res.json({
            status: 500,
            message: "Authentication failed.",
            currentUser: null,
          });
        }
      });
    } else {
      return res.json({
        status: 500,
        message: "Authentication failed.",
        currentUser: null,
      });
    }
  
  },
  
  logout : (req: any, res: any) => {
    req.session.destroy();
    return res.json({
      status: 200,
      message: "Logged out successfully.",
    });
  },
  
  searchUserData : (req: any, res: any) => {
    var postData = req.body;
    Users.find({
        $or: [{
            firstName: {
              $regex: new RegExp(
                ".*" + postData.quickSearch.toLowerCase() + ".*",
                "i"
              ),
            },
          },
          {
            lastName: {
              $regex: new RegExp(
                ".*" + postData.quickSearch.toLowerCase() + ".*",
                "i"
              ),
            },
          },
        ],
      },
      (err: any, data: any) => {
        if (data === null) {
          return res.json({
            status: 500,
            message: "There are some error while getting user data.",
            data: err,
          });
        } else {
          if (data.length) {
            return res.json({
              status: 200,
              message: "Getting User data successfully.",
              data: data,
            });
          } else {
            return res.json({
              status: 500,
              message: "No User Data Found.",
              data: data,
            });
          }
        }
      }
    );
  },
  
  getUserInfo : async (req: any, res: any) => {
    var whereObj = req.body;
    if (whereObj.forgotLink && whereObj._id) {
      whereObj.forgotStatus = 1;
      try {
        let userDetails: any = await Users.findOne(whereObj);
        if (userDetails) {
          let checkLinkExireTime = globalService.linkExpiryTimeCheck(userDetails.updatedAt); // HERE WE ARE CHECKING LINK TIME EXPIRATION.
          if (checkLinkExireTime) {
            return res.json({
              message: "Get the user info successfully.",
              status: 200,
              data: userDetails,
            });
          } else {
            return res.json(globalService.linkExpiryError());
          }
        } else {
          return res.json(globalService.linkExpiryError());
        }
      } catch (error) {
        return res.json(globalService.linkExpiryError());
      }
    } else {
      return res.json(globalService.linkExpiryError());
    }
  }
}