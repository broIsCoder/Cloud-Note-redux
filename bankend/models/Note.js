const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true,
    },
    tag:{
        type:String ,
        default:"General"
    },
    date:{
        type:Date,
        default:new Date
    }
})

module.exports = mongoose.model("notes",notesSchema) ;