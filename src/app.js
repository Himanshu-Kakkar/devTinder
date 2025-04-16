
const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const User = require("./models/user.js");

// correct
app.use(express.json()); // applied middleware to every route
// Now we will get JS object and server can read and console.log() works
//wrong 
// bcz express.json() returns a middleware
// app.use(() => {
//     express.json();
// });

app.post("/signup", async (req,res)=> {

    console.log(req.body); // undefined
    // bcz our server cant read JSON data
    // server can read JS object
    // need a middleware to convert JSON to JS object
    // predefined middleware by express
    // express.json()
    // save the data using postman
    const user = new User(req.body);
    try {
        await user.save(); 
        res.send("user added successfully");
    } catch (err) {
        res.status(400).send("Error while saving the user", err.message);
    }
    // mannually save the data from the code
    // creating a new instance of the user model
    // this is NOT JSON 
    // this is JS object
    // data is in key-value pair
    // In JSON key is also a string
    // JS object can take comma after last feild
    // while JSON can not

    // const user = new User({
    //     firstName: "Virat",
    //     lastName: "Kohli",
    //     emailId: "vk@gmail.com", 
    //     password: "anushka",
    //     // _id: "uniqueID" // dont mess up with this
    //     // lets mongodb handle this
    //     // dont interfare in the automatic feilds of 
    // });
    // try {
    //     await user.save(); // returns a promise
    //     // almost every mongodb function return a promise so always try to use async await
    //     res.send("user added successfully");
    // } catch (err) {
    //     res.status(400).send("Error while saving the user", err.message);
    // }
})

// get users by emails
app.get("/user", async (req,res) => {
    const userEmail = req.body.emailId;
    try {
        // await User.find({ emailId: userEmail});
        // res.send(User);
        const users = await User.find({ emailId: userEmail});
        // User defined as model in user.js database schema 
        if(users.length === 0){
            res.status(404).send("User Not Found");
        }
        else{
            res.send(users);
        }
        

    } catch (err) {
        res.status(400).send("something went wrong");
    }  
})

// get users by ID
app.get("/ID",async (req,res) => {
    const userID = req.body._id;
    try {
        const users = await User.findById( {_id: userID});

        if(users.length === 0){
            res.status(404).send("User Not Found");
        }
        else{
            res.send(users);
        }

    } catch (err) {
        res.status(400).send("Something went wrong");
        
    }
})

// FEED API, GET /feed get al the users from the databases
app.get("/feed", async (req,res) => {
    try {
        const users = await User.find({}); //find({}) to fatch complete feed all rows
        res.send(users);
    } catch (err) {
        res.status(400).send("something went wrong");
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

