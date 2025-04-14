
const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const User = require("./models/user.js");


app.post("/signup", async (req,res)=> {

    // creating a new instance of the user model
    const user = new User({
        firstName: "Virat",
        lastName: "Kohli",
        emailId: "vk@gmail.com",
        password: "anushka",
        // _id: "uniqueID" // dont mess up with this
        // lets mongodb handle this
        // dont interfare in the automatic feilds of 
    });
    try {
        await user.save(); // returns a promise
        // almost every mongodb function return a promise so always try to use async await
        res.send("user added successfully");
    } catch (err) {
        res.status(400).send("Error while saving the user", err.message);
    }
    
    
})

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

