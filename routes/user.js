const {Router}= require("express")
const { UserModel } = require("../models/user.model")

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const userRoutes= Router()

userRoutes.get("/",(req,res)=>{
    res.send("This is home")
})

userRoutes.post("/signup",(req,res)=>{
    let {email,password,age}= req.body

    
    
    bcrypt.hash(password, 6, async function(err, hash) {
        if(err){
            res.send({"Error":"someting error"})
        }else{
            
        
            const newUser= new UserModel({email,password: hash,age})
            await newUser.save()
            res.send({"message":"successfully registered"})
        }
    });
    
})


userRoutes.post("/login",async(req,res)=>{
    let {email,password}= req.body
    let user= await UserModel.findOne({email})
    let hash= user.password
    bcrypt.compare(password, hash, async function(err, result) {
        // console.log(result)
       if(user && result){

        var token =  jwt.sign({userId: user._id}, process.env.JWT_SECRET);
        // console.log(token)
         res.send({
            message: "login successful",
            token
         })

       }else{
          res.send({"Error":"someting error"})
       
       }
    });
})


module.exports={
    userRoutes
}