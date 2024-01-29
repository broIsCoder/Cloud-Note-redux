const mongoose = require("mongoose");// import mongoose library in nodejs

// uri to mongoDb 
const mongoURI = "mongodb://localhost:27017/cloudnote"

//a function to connect to mongoDb
const connectToMongo = async ()=>{
    await mongoose.connect(mongoURI);
    console.log("CONNECTED to MongoDB Successfully !");
}

module.exports = connectToMongo ;    // export connectToMongo function