const express = require("express");

const app = express();

// if we dont send the response back it will goes to infinite loop 
// res.send("route handle 1");

// arguments for app.use()
// (route, route_handler)
// multiple route handler can be there as other arguments
// only 1st call back() will be handled



app.use("/user", (req,res,next) => {
    // route handler 1
    console.log("Handling the route user 1");
    next();
    // res.send("route handler 1"); 
},
(req,res,next) => {
    console.log("handling the route user 2");

    res.send("route handling 2");

// if we do not call next() 
// it will not go any further
// and any res.send() in further functions will not give error
    
},
(req,res,next) => {
    console.log("3rd response handler called");
    res.send("route handling 3");
    next();
})


app.use("/user2", (req,res,next) => {
    console.log("Handled route 1");
    next();
},
(req,res,next) => {
    console.log("Handled route 2");
    next();
    // if we not send response it will hanging out there ( infinite loop)
    // if we call next()
    // and there is no next middleware it will show error 
    // bcz there is no route handler
    // how many route handler you can use 
    // but at the end response must be send

}, (req,res,next) => {
    console.log("handle route 3");
    res.send("response 3");
})

// // these cb() are called middleware functions()
// next() is mainly used in middleware functions in Express.js. Middleware functions can:
// ✅ Modify the req and res objects
// ✅ Execute some code
// ✅ End the request-response cycle
// ✅ Call the next middleware function

// 1st response went successfully and the 2nd response will through an error
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
// server can send only one response on a single route


// app.use("/",(req,res) => {
//     res.send("chal gya");
// })

// 
// we can wrap around all middleware functions in an array
app.use("/wrapInArray", [
(req,res,next) => {
    console.log("handle route 3");
    next();
},
(req,res,next) => {
    console.log("handle route 3");
    next();
},
(req,res,next) => {
    console.log("handle route 3");
    res.send("responses are wrapped in an array");
}])

// app.use("/wrapInArr", rH1, rH2, rH3, rH4, rH5 );
// app.use("/wrapInArr", rH1, rH2, rH3, [rH4, rH5] );
// app.use("/wrapInArr", rH1, rH2, [rH3, rH4], rH5 );
// app.use("/wrapInArr", [rH1, rH2, rH3], rH4, rH5 );
// app.use("/wrapInArr", [rH1, rH2, rH3, rH4, rH5] );

app.listen(7777, ()=> {
    console.log("server is created successfully on port 7777" );
})