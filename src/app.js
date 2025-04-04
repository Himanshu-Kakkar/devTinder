const express = require("express");

const app = express();

// app.set(key,value); key is predefined string 
// app.key("meri apni key", "meri apni value"); // userdefined key 
// predefined key speeling mistake can give error or can add new key

app.set("case sensitive routing", false); // case sensitive
app.set("strict routing", true); // routes k last mein / lgana 

// app.use("/", (req,res,next) => {
//     console.log("rhandling route 0");
//     next();
// })
app.use("/user", (req,res,next) => {
    console.log("handling route 2");
    res.send("response 2");
})
// it will never get a chance to execute
app.use("/user", (req,res,next) => {
    console.log("handling route 1");
    next();
})
// sending a request to express server, it will go one by one check all these methods
// it will find its matching, go and call cb() keep calling all cb()s untill a function which actually response back
// all non responsive functions are middleware 
// and response krne wala function called as request handler
// middleware are in all methods { use, get, post, patch, delete }

// this is not the proper way to check authorization
// here the middleware concept comes
// generally broadly middleware used with app.use()

app.get("/admin1/getAllData", (req,res,next) => {
    const token = "xyza";
    const isAdminAuthrozed = token === "xyz";
    if(isAdminAuthrozed){
        res.send("all data send");
    }
    else{
        res.status(401).send("unauthorised request");
    }
})


app.get("/admin1/deleteUser", (req,res,next) => {
    const token = "xyza";
    const isAdminAuthrozed = token === "xyz";
    if(isAdminAuthrozed){
        res.send("user deleted successfully");
    }
    else{
        res.status(401).send("unauthorised request");
    }
})

// handle Auth middleware for all GET, POST, PATCH, DELETE
// for Auth middleware only use app.use()
// app.all("/admin", (req,res, next) => {
    
// })
// .all exactly the same way .use
app.use("/admin", (req,res, next) => {
    console.log("admin authorisation is getting checked ");
    const token = "xyz";
    const isAdminAuthrozed = token === "xyz";
    if(!isAdminAuthrozed){
        res.status(401).send("Unauthorized request");
    }
    else{
        next();
        // res.send(" only /admin or other route requested ");
    }
})

// here you can define any route start with /admin/getAllData
// /admin/deleteUser

app.get("/admin/addUser", (req,res,next) => {
    console.log("user added ");
    res.send("user added responsed");
})
app.delete("/admin/deleteUser", (req,res,next) => {
    console.log("user deleted ");
    res.send("user deleted responsed");
})

 
app.listen(7777, ()=> {
    console.log("server is started");
})