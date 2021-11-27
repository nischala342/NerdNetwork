const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const user = mongoose.model("user") 
const bcrypt = require('bcryptjs')

router.post('/signup',(req,res)=>{
const {name,email,password} = req.body
if(!email || !password || !name){
 return res.status(422).json({error:"pls fill"})
}
user.findOne({email:email})
.then((savedUser)=>{
    if(savedUser){
        return res.status(422).json({error:"user exists"})
    }
    bcrypt.hash(password,12)
    .then(hashedpassword=>{
        const User = new user({
            email:email,
            password:hashedpassword,
            name:name
        })

        User.save()
        .then(user=>{
            res.json({message:"saved succesfully"})
        })
        .catch(err=>{
            console.log(err)
        })
    
    })
        
    
})
.catch(err=>{
    console.log(err)
})
})



module.exports = router