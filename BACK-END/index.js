import connectDB from "../DATABASE/connect.js";
import app from "./server.js";
import { userRouter } from "./ROUTES/user.routes.js";
connectDB().
then(()=>{
   app.listen(4000,()=>{console.log("mongoDB connected")})
})
.catch((err)=>{
    console.log(err)
})

app.use('/api/users',userRouter)