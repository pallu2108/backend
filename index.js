const express= require("express")
const {connection} = require("./config/db")
const {userRoutes}= require("./routes/user")
const {blogRoutes}= require("./routes/blog")
const {authentication} = require("./middleware/authentication")


var cors = require('cors')
const app= express()

app.use(cors())
app.use(express.json())
app.use("/user",userRoutes)
app.use(authentication)
app.use("/blog",blogRoutes)
app.listen(8080, async()=>{
    try{
      await connection;
      console.log("conndected")
    }
    catch(err){
       console.log("something err")
  
    }
    console.log("started")
  })