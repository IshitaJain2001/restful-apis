import mongoose, { Schema , model } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({
    path:'c:/Users/jains/OneDrive/Desktop/leaning backend/.env'
})

console.log(dotenv)
const userSchema =new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required :true,
        unique:true,


    },
    password:{
        type:String,
        required:true,

    },
    coverImage:{
        type:String
    },
    avatar:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String,
        
    }
},{
    timestamps:true
})


userSchema.pre('save', async function (next){
  if  (!this.isModified("password")) {
    return next()
  }
   
    this.password= await bcrypt.hash(this.password,10)
    next()

})


userSchema.methods.isPasswordCorrect= async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken= function(){
   const accessToken= jwt.sign({
        _id:this._id,
        email:this.email,
        name:this.name

    },
process.env.ACCESS_TOKEN_SECRET, 
{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
})

return accessToken
}


userSchema.methods.generateRefreshToken= function(){
    return jwt.sign({
        _id:this._id,
       
        name:this.name

    },
process.env.REFRESH_ACCESS_SECRET,
{
    expiresIn:process.env.REFRESH_ACCESS_EXPIRY
})
}

const User= model("User", userSchema)

export default User