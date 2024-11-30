import { upload } from "../../DATABASE/cloudinary.js";
import User from "../../DATABASE/MODELS/user.models.js";

import verifyToken from "../auth.js";

import jwt from "jsonwebtoken"



const registerUser= async(req,res)=>{
const {name,email,password,confPassword}=  req.body
console.log("name is=>", password,confPassword)

if(name.trim()==="" || email.trim()==="" || password.trim()===""){
 
 
  return res.status(400).json({
    "message":"fields cannot be empty"
   })
}

if(password!==confPassword){
  return res.status(400).json({
  message: "password and confirm password need to be the same "
   })
}

if(password.length<=7){
return res.status(400).json({
  message:" password's length must be at least 8"
})
}
const regex = /^(?=.*\d).+$/;
if(!regex.test(password)){
 return res.status(400).json({message:"MUst contain at least one digit in password"})
}
const userExist= await User.findOne({
  $or: [ { email }]
})

if(userExist){
  return res.status(409).json("user exists already")
}


const avatarLocalPath = req.files?.avatar[0]?.path;



if (!avatarLocalPath) {
  return res.json({
   message:"avatar image is must"
  })
}

const avatar = await upload(avatarLocalPath)



let coverImageUrl = ""; // Default value
const coverImageFile = req.files?.coverImage?.[0];
if (coverImageFile) {
  const coverImage = await upload(coverImageFile.path);
  coverImageUrl = coverImage.url;
}



const user = await User.create({
  name,
  avatar: avatar.url,
  coverImage: coverImageUrl,
  email, 
  password,
 
})


return res.status(201).json("user registered successfully")
}


const createTokens=async(userId)=>{
  try{
const user= await User.findById(userId)

const accessToken = user.generateAccessToken()
const refreshToken= user.generateRefreshToken()

user.refreshToken = refreshToken
 await user.save({validateBeforeSave:true} )
console.log(user)
return{
  refreshToken,
  accessToken
}}
catch(e){
  res.status(500).json("error ",err)
}}

const loginUser= async(req,res)=>{
const {email,password}  =req.body

if(!email){
  res.status(400).json("enter email id")
}

const ifUserExists=await User.findOne({email})
if(!ifUserExists){
  return res.status(404).json("no such user exists")
}

const isCorrect=await ifUserExists.isPasswordCorrect(password)
if(!isCorrect){
  return res.status(401).json("Incorrect password")
}

const {refreshToken,accessToken} = await createTokens(ifUserExists._id)

const options= {
  httpOnly:false,
  secure:false,
sameSite:'Lax',
maxAge: 86400000
}


// console.log("accessToken", accessToken)
return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json({message:"loggedin successfully", accessToken,refreshToken})
}


const loggedIn= async(req,res)=>{
const token= req.cookies.accessToken



if(!token){
  console.log("token not found")
 return res.status(404).json("login first")
}



const isVerified= await verifyToken(token)


return res.send({name:isVerified.name})
}


const logOut= async (req,res)=>{
try {
  const token= req.cookies.accessToken
  if(!token){
    return res.status(401)
    .json({
      message:"no user found"
    })
  }
const isVerified= await verifyToken(token)
if(!isVerified){
  return res.status(403).json({ message: "Invalid token" });
}

const user=  await User.findById(isVerified._id)

if(!user){
 return res.status(401).json({
         message:"no user found"
  })
}

user.refreshToken= null
await user.save()
const options= {
  httpOnly:true,
  secure:false,
  sameSite:'lax'
}
return res
.clearCookie("accessToken",options)
.clearCookie("refreshToken",options)
.status(200)
.send({message:"loggedout Successfully"})

} catch (error) {
 return res.status(500).json({ message: "Something went wrong" });
}
}

const refreshAccessToken = async(req,res)=>{
const receivedToken= req.cookies.refreshToken

if(!receivedToken){
 return res.status(401,"unauthorized request")
}

const decoded= jwt.verify(receivedToken, process.env.REFRESH_ACCESS_SECRET)

const user = await User.findById(decoded?._id)

if(!user){
 return res.status(401,"invalid refresh token ")
}

const {accessToken, newRefreshToken}= await createTokens(user._id)

const options= {
  httpOnly:true,
  secure:false
}

return res.status(200).cookie("accessToken", accessToken,options).cookie("refreshToken",{refreshToken:newRefreshToken},options).send("heyyy")
}


const getEditProfile = async(req,res)=>{

  try {
    const token = req.cookies.accessToken
    if(!token){
      return res.status(401).send({
      message:  "unauthorized user"
        })
    }
    const decoded= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
    const user=await User.findById(decoded?._id)
    
    
    if(!user){
      return res.status(401).send({
        message:  "unauthorized user"
          })
    }
    
    const {name,email}= user
     return res.status(200).send({
    name,email
     }
     )
  } catch (error) {
    const token = req.cookies.refreshToken

  }

}



const setEditProfile = async(req,res)=>{
  const token = req.cookies.accessToken
if(!token){
  return res.status(401).send({
  message:  "unauthorized user"
    })
}
const decoded= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

const user=await User.findById(decoded?._id)
// console.log(user)

if(!user){
  return res.status(401).send({
    message:  "unauthorized user"
      })
}



 const {email,password,name}= req.body
 if(email) user.email= email.trim()
 if(password) {user.password= password.trim()}
  if(name) user.name= name.trim()

  await user.save({ validateModifiedOnly: true });
 
  return res.status(200).json({
    message:"profile updated",
    email:user.email,
    name: user.name
  })
}

export {registerUser,loginUser,loggedIn,logOut,refreshAccessToken,getEditProfile,setEditProfile}