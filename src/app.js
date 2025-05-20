
const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");

const authRouter = require('./routes/auth.js');
const requestRouter = require('./routes/request.js');
const profileRouter = require('./routes/profile.js');

// correct
app.use(cookieParser());
// To read cookie
app.use(express.json()); // applied middleware to every route
// to read data in json format
// Now we will get JS object and server can read and console.log() works
//wrong 
// bcz express.json() returns a middleware
// app.use(() => {
//     express.json();
// });

app.use("/", authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

connectDB()
.then(()=>{
    console.log("database connect successfully");
    app.listen(7777, ()=> { 
        console.log("server is started");
    })
})
.catch(()=> {
    console.error("database cannot be connected ");
})

