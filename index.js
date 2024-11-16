
const cors= require('cors')

const data = require('./data')
const express = require('express')

const app = express()
app.use(cors({
    origin:"http://localhost:3000"
}))

app.get('/api',(req,res)=>{
    res.json(data)
})

app.get('/api/firstName',(req,res)=>{

//   res.send(user.first_name)

let firstNames = data.map(user=>user.first_name)

res.json(firstNames)

})

const PORT= 7000

app.listen(PORT,()=>{console.log("server")})