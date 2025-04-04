const express = require("express");

const app = express();

app.use("/user", (req,res) => {

    // res.send("route handle 1");
})

// app.use("/",(req,res) => {
//     res.send("chal gya");
// })


app.listen(7777, ()=> {
    console.log("server is created successfully on port 7777" );
})