const express = require('express');//import express library
var cors = require('cors');
const connectToMongo = require('./db');//import function from db.js
require('dotenv').config();


connectToMongo();   
const app = express();   // creating express app used to define routes and handle HTTP requests
const port = 5000 ;  
// const port = process.env.PORT; // root URL

//When a user accesses the URL of endpoint, the server will respond with the message
// endpoint is like a page but for api
/*Routes
app.get("/",(req,res)=>{   // http request on endpoint
    res.send("home"); 
})
app.get("/signup",(req,res)=>{       // http request on endpoint
    res.send("signup");
})
app.get("/login",(req,res)=>{           // http request on endpoint
    res.send("login");
})*/
app.use(cors())
app.use(express.json())  //middleware // for using req.body
//Linking app to Routes for accessing routes's api
app.use('/api/auth',require('./routes/auth'));     // takes to authentication endpoint
app.use('/api/notes',require('./routes/note'));      // takes to logged acc for notes
  // Apply the error handler middleware
//   app.use(errorHandler);


// execute server
app.listen(port,()=>{
    console.log(`CloudNote Listening At (http://localhost:${port})`);
})
  