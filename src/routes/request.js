const express = require('express');
const { userAuth } = require("../middlewares/auth.js");


const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req,res) => {

    const user = req.user;
    // sneding a connection request
    console.log("sneding a connection request");

    res.send(user.firstName+" "+user.lastName+ " send the Connection request!");
})

module.exports = requestRouter;