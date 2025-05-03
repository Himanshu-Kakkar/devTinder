
const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const { validateSignUpData } = require("./utils/validation.js");
const bcrypt = require("../node_modules/bcrypt/bcrypt.js")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth.js");



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

app.post("/signup", async (req,res)=> {
    try {    
        // VALIDATION OF DATA
        validateSignUpData(req);
        const {firstName, lastName, emailId, password} = req.body;

        // ENCRYPT THE PASSWORD
        const passwordHash = await bcrypt.hash(password,10);
        // 10 is the level of encryption 
        // higher level == more encryption == more secure == takes more time to encrypt as well as decrypt
        console.log(passwordHash);

        // CREATING A NEW INSTANCE
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
        await user.save();

        res.send("User added Successfully");
    }
    catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }

})

app.post("/login", async (req, res)=> {
    try {
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId});
        if(!user){
            // throw new Error("Email ID not present in DB");
            // NEVER LEAK YOUR DB INFO 
            // ALWAYS USE:
            throw new Error("Invalid Credentials");
            
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){

            // Create a JWT token
            const token = await jwt.sign({_id: user._id},"DEV@Tinder$790", {
                expiresIn: "1d"
                // expiresIn: "1h"
            })

            // jwt.sign( hidden data inside token, secret key );
            console.log(token);

            // Add a token to cookie and send the response back to user
            // EXPIRING A COOKIE AS WELL AS TOKEN
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000), // it will add expire details in cookie in postman
            });
            // res.cookie("token", "manuallyWrittenTokenAsOfNow");

            res.send("Login Successfull");
        }
        else{
            throw new Error("Invalid Credentials");
            
        }

    } catch (err) {
        res.status(400).send("ERROR: "+ err.message);
    }
})

app.get("/profile", userAuth, async (req,res) => {
    try {
        const user = req.user;
        res.send(user); 
    
    } catch (error) {
        res.status(400).send("Error: "+ error.message)
        
    }
})

app.post("/sendConnectionRequest", userAuth, async (req,res) => {

    const user = req.user;
    // sneding a connection request
    console.log("sneding a connection request");

    res.send(user.firstName+" "+user.lastName+ " send the Connection request!");
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

