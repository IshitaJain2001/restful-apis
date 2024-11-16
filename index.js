
const cors= require('cors')

const data = require('./data')
const express = require('express')

const app = express()
app.use(cors({
    origin:"http://localhost:3001"
}))

app.get('/api',(req,res)=>{
    res.json(data)
})

app.get('/api/:id',(req,res)=>{

const index= Number(req.params.id)
const user= data[index]


if (user) {
    console.log("user found")
   res.json(user)
} else {
    res.status(404).send('User not found');  
}

})

const PORT= 7000

app.listen(PORT,()=>{console.log("server")})