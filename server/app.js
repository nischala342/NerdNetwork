const express = require('express')
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')


mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahhhhh")
})
mongoose.connection.on('error',(err)=>{
    console.log("not connected",err)

})

require("./models/user");
require("./models/post")

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));




app.get('/about',(req,res)=>{
    res.send("about page")
})

app.listen(PORT,()=>{
    console.log("server is running on ",PORT)
})