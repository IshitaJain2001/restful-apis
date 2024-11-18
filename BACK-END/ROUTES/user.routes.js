import { Router } from "express";
import { registerUser } from "../CONTROLLER/user.controller.js";

const userRouter= Router()

userRouter.get('/register',registerUser)

export {userRouter}