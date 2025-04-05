const express = require("express");
const app = express();
const connectDB = require("./config/database")
const User = require("./models/user") 



app.post("/signup", async (req,res) => {
    // creating a new instance of user model
    // await connectDB()
    try {
        const user = await User.create({
            firstName: "Nalla",
            lastName: "Kohli",
            emailId: "vrkohli@gmail.com",
            password: "4321" 
            // _id: "this is mongoDB object ID"
            // _v: " version"
        })
        // await user.save();
        console.log(user);
        res.json({msg: "User created", user});

    } catch (err) {
        res.status(400).send("An error")
    }
    
})

// app.listen(7777, ()=> {
//     console.log("server is started");
// })
connectDB()
.then(() => {
    console.log("DB connection stablished");

    app.listen(7777, ()=> {
        console.log("server is started");
    })
})
.catch((err) => {
    console.error("An error is occured",err); 
})
