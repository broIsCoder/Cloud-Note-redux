const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    date:{
        type:Date ,
        default:Date.now
    }
});

const User = mongoose.model("user",userSchema) ;
// User.createIndexes();     to make email unique by creating index in mongoDb
module.exports = User;