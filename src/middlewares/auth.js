const User = require("./models/user.js");
const jwt = require("jsonwebtoken");


// DUMMY TOKEN AUTHENTICATION

// const adminAuth = (req,res, next) => {
//     console.log("admin authorisation is getting checked ");
//     const token = "xyz";
//     const isAdminAuthrozed = token === "xyz";
//     if(!isAdminAuthrozed){
//         res.status(401).send("Unauthorized request");
//     }
//     else{
//         next();
//     }
// }
// const userAuth = (req,res, next) => {
//     console.log("user authorisation is getting checked ");
//     const token = "xyz";
//     const isAdminAuthrozed = token === "xyz";
//     if(!isAdminAuthrozed){
//         res.status(401).send("Unauthorized request");
//     }
//     else{
//         next();
//     }
// }

// ACTUAL TOKEN AUTHENTICATION
const userAuth = async (req,res, next) => {
    // read the token from the request cookies

    const {token} = req.cookies;
    if(!token){
        throw new Error("Invalid Token");
    }


    // VALIDATE THE TOKEN
    const deCodedObj = await jwt.verify(token, "DEV@Tinder$790");
    const {_id} = deCodedMsg;

    // FIND THE USER
    const user = await User.findById(_id);
    if(!user){
        throw new Error("user doest exist");
        
    }
}




module.exports = {
    adminAuth,
    userAuth
    
}