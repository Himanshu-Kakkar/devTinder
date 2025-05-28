
const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");

const authRouter = require('./routes/auth.js');
const requestRouter = require('./routes/request.js');
const profileRouter = require('./routes/profile.js');
const userRouter = require("./routes/userRouter.js");
const cors = require('cors');

// CORS (Cross-Origin Resource Sharing) is a security feature built into browsers that blocks web applications from making requests to a different origin than the one that served the web page.
// When you use the cors middleware in Express, it tells the browser:

// "Yes, this server allows requests from other origins."

// So, yes, it allows connections from:

// Same IP but different ports

// Different IP addresses

// Even different protocols (http ↔ https), if configured

// app.use(cors()); Allow all origins

// backend should know where your frontend is hosted
// Allow specific origin
app.use(cors({
    origin: "http://localhost:5173", // whitelisting this domain name
    credentials: true
}));

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
app.use("/", userRouter);


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

