const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.use("/user/data", userAuth, (req,res) => {
    console.log("user data");
    res.send("user data sent"); 
})

app.use("/user/login", (req,res) => {
    console.log('log in');
    res.send("logged in succesfully");
})


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