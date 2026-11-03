const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minlength:6

    },
    number:{
        type:Number,
        required:true
    },
    
})

module.exports = mongoose.model("UserData",userSchema)