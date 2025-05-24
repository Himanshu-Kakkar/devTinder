const express = require('express');
const { userAuth } = require("../middlewares/auth.js");
const connectionRequest = require("../models/connectionReq.js");

const userRouter = express.Router();

// Get all the pending connection request for the logged in user
userRouter.get("/user/requests/received", userAuth, async (req,res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await connectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId","firstName lastName");

        // other way to write
        // }).populate("fromUserId", ["firstName", "lastName"]);
        
        // it will show only first anme and last name to receiver or toUserId to which user tyou sent the request
        // }).populate("fromUserId");

        res.json({
            message: "Data fetched successfully",
            data: connectionRequests,
        });

    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
    
})

module.exports = userRouter;