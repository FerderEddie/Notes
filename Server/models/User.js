const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

// users schema structure
const userSchema = new Schema({

    userName:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true,
        unique:true
    },
    userPassword:{
        type:String,
        required:true
    }
})

// middleware that encrypts users password before saving in controller
userSchema.pre("save", async function(next){
    const hash = await bcrypt.hash(this.userPassword,10)
    this.userPassword = hash
    next()
})

module.exports = mongoose.model("users",userSchema)