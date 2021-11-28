const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const user = mongoose.model("user") 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

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

router.post('/signin',(req,res) => {
    const{email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"Please enter email and password"})
    }
    user.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email address"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch => {
            if(doMatch){
                //res.json({message: "Signed in successfully!"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                res.json({token})

            }
            else{
                return res.status(422).json({error: "Invalid Password"})
            }
        })
        .catch(err => {
            console.log(err)
        })

    })
})


module.exports = router