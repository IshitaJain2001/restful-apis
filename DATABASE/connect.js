
import mongoose from "mongoose"
import dotenv from 'dotenv'
import path from "path"
dotenv.config({
    path: "c:/Users/jains/OneDrive/Desktop/leaning backend/.env",
})
console.log(process.env.MONGODB_URL)
const connectDB= async ()=>{
try{
    const connectionInstance =await mongoose.connect(process.env.MONGODB_URL)
   
    console.log("connected")
}
catch(err){
    console.log("error in mongoDB: ", err)
}
}

export default connectDB