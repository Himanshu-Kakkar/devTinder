const express = require("express");

const app = express();
const PORT = 7777;


// after /hello handle by this
// http://localhost:7777/hello/123 
// not http://localhost:7777/hello123 NOT

app.use("/hello", (req,res) => {
    res.send("Hello World");
});
 
// after /test handle by this
app.get("/test",(req,res) => {
    res.send("Testing server");
});

app.use("/user", (req,res) => {
    res.send("HAHAHAAAAAHHAHAHA");
})


app.get("/user", (req,res) => {
    res.send({firstName: "Akshay", lastname:"Saini"});
})


app.post("/user", (req,res) => {
    // saving data on DB
    res.send("Data saved successfully to the DB");
})

app.delete("/user", (req,res) => {
    res.send("data deleted successfully");
})

// after / anything handle by this 
// wild card route 
// if anything doesnt match with route afer / this will work
// app.use("/", (req,res) => {
//     res.send("Namaste NodeJS")
// })

app.listen(PORT, () => {
    console.log("server is started at port:",PORT);
});


// What Are Dependencies?

// In programming, dependencies are external libraries, modules, 
// or packages that your project relies on to function properly.

// For example, in a Node.js + Express project, Express itself is a 
// dependency because your app needs it to run.

// ORDER OF CODE DOES MATTER A LOT

// const authMiddleware = ((req, res, next)=>  {
//     console.log("Auth middleware ran.")
//     next();
// })


// app.use("/", (req,res,next) => {

//     next();
//     res.send("Auth has been checked");
// });
