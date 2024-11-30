
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { userRouter } from "./ROUTES/user.routes.js";
const app=express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    // methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,
}))

app.use(express.urlencoded({extended:true}));

app.use('/api/users',userRouter)
export default app;
