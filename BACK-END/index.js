import connectDB from "../DATABASE/connect.js";
import app from "./server.js";

connectDB().
then(()=>{
   app.listen(process.env.PORT||5000,()=>{console.log("mongoDB connected")})
})
.catch((err)=>{
    console.log(err)
})

