const express = require("express");

const app = express();
const PORT = 7777;

const authMiddleware = ((req, res, next)=>  {
    console.log("Auth middleware ran.")
    next();
})

app.use("/hello", (req,res) => {
    res.send("Hello World");
});

app.get("/test", authMiddleware,(req,res) => {
    res.send("Testing server");
});

// app.use("/", (req,res,next) => {

//     next();
//     res.send("Auth has been checked");
// });


app.listen(PORT, () => {
    console.log("server is started at port:",PORT);
});


// What Are Dependencies?

// In programming, dependencies are external libraries, modules, 
// or packages that your project relies on to function properly.

// For example, in a Node.js + Express project, Express itself is a 
// dependency because your app needs it to run.