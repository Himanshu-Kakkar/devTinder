
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

    // console.log("dsnsd"+ req.body); // undefined
    // bcz our server cant read JSON data
    // server can read JS object
    // need a middleware to convert JSON to JS object
    // predefined middleware by express
    // express.json()
    // save the data using postman
    // const user = req.body;
    // console.log("Res is", user);
    try {
        const user = req.body;
        console.log("user is", user);

        const newuser = new User(user);
        console.log("\n\nres is", newuser);
        await newuser.save();
        res.send("user added successfully");
    } catch (err) {
        console.error(err); // log error to run server continuously while valoidation failed
        res.status(400).send("Error while saving the user", err);
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
    console.log(userID);

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
// GET, POST are the API to retreive the data from db 
// find, ... are mongoose methods ( part of API ) to retreive data
// mongoose methods apply on models ( DB models) e.g. User defined in database.js

// delete a user from the db
app.delete("/dlt", async (req,res) => {
    const userID = req.body._id;

    try {
        const user = await User.findByIdAndDelete({_id: userID});
        // const user = await User.findByIdAndDelete(userID);
        
        if(!user){
            res.status(404).send("User not found");
        }
        else{
            res.send("User deleted successfully", user );
        }
        
    } catch (err) {
        res.status(400).send("something went wrong");
        
    }

})


// Update the DB using PATCH
// findByIdAndUpdate() , findOneAndUpdate() behind the scene both are same thing
// findByIdAndUpdate() with {_id : u8serID} work same as findOneAndUpdate()
app.patch("/update/:userId",async (req,res) => {
    
    // const userId = req.body.userId;
    // const userId = req.params._id;

    const userId = req.params?.userId;
    const data = req.body;

    try {

    const ALLOWED_UPDATES = 
    [
        // "_id", // "userId"
        "photoUrl", 
        "about", 
        "gender",
        "age",
        "skills"
    ];

    // example:
    // {
    //     "_id": "680fa9bc02b545269f10db41",
    //     "firstName": "samay raina",
    //     "emailId": "time@samay.com",
    //     "password": "1234",
    //     "age": 19,
    //     "gender": "male",
    //     "skills": ["javascript", "humour", "jokes"]
    // }

    
    const isUpdateAllowed = Object.keys(data).every((k) => 
        ALLOWED_UPDATES.includes(k)
    );
    if(!isUpdateAllowed){
        throw new Error("Update Not Allowed");
    }
    if(data?.skills.length > 10){
        throw new Error("skills cant be more than 10");
    }
    const user = await User.findByIdAndUpdate({_id: userId}, data, { 
        returnDocument: "after",
        runValidators: true, // apply validators on patch put route,
        // validators by default applied on post or for create new users 
        
    });
    // by default option for {returnDocument: "before"};
    console.log(user);
    // const user = await User.findByIdAndUpdate(userId, data);
    // Any other feild apart from database schema will not update
    if(!user){
        res.status(404).send("User Not Found");
    }
    else{
        res.send("User Updated Successfully");
    }
    } catch (err) {
        res.status(400).send("UPDATE FAILED");
    }
})
// User update by email findOneAndUpdate(); 
app.patch("/updateByEmail",async (req,res) => {
    const email = req.body.emailId;
    const data = req.body;

    try {
        const user = await User.findOneAndUpdate({emailId: email}, data, { returnDocument: "before"});
        // by default option for {returnDocument: "before"};
        console.log(user);
        // const user = await User.findByIdAndUpdate(userId, data);
        // Any other feild apart from database schema will not update
        if(!user){
            res.status(404).send("User Not Found");
        }
        else{
            res.send("User Updated by email Successfully");
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
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

