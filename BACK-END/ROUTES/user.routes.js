import { Router } from "express";
import { getEditProfile, loggedIn, loginUser, logOut, registerUser, setEditProfile } from "../CONTROLLER/user.controller.js";
import { multerUpload } from "../../DATABASE/multer.js";
import { refreshAccessToken } from "../CONTROLLER/user.controller.js";
const userRouter= Router()

userRouter.route('/register').post(
  multerUpload.fields([
{
name:'avatar',
maxCount:1
},
{
name:"coverImage",
maxCount:1
}
  ]),

 
  registerUser
)

userRouter.route('/login').post(loginUser)
userRouter.route('/loggedIn').get(loggedIn)

userRouter.route('/logout').get(logOut)
userRouter.route('/refresh').post(refreshAccessToken)


userRouter.route('/EditProfile').get(getEditProfile)

userRouter.route('/Edit-Profile').put(setEditProfile)
export {userRouter}