const express = require('express')
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')
require('./models/user')


app.use(express.json())
app.use(require('./routes/auth'))




mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahhhhh")
})
mongoose.connection.on('error',(err)=>{
    console.log("not connected",err)

})

app.get('/about',(req,res)=>{
    res.send("about page")
})

app.listen(PORT,()=>{
    console.log("server is running on ",PORT)
})