const { error } = require("console");
const express = require("express");

const app = express();

app.get("/user/throwErr", (req, res) => {
    // preferable throw err in try catch
    try {
        throw new Error("error msg");    
    } catch (err) {
        res.status(500).send("error caught", err);
    }
    
    // unreachable code
    res.send("learning try catch"); 
})
//OR

app.use("/errorAaGya", (req,res) => {
    const err = new Error("simple error");
    next(err); // error will passed to error handling middleware
})
// try to write error middleware at the end
// app.use() -> request handler() or middleware();  parameters must in order err, req, res, next
app.use("/", (err, req, res, next) => {
    if(err){
        res.status(500).send("something went wrong"); 
    }
})

app.listen(7777, ()=> {
    console.log("server is started");
})
