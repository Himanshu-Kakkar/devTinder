const express = require('express');
const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequest = require('../models/connectionReq.js');
const User = require("../models/user.js");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res) => {

    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;


        // validation to just do left swipe (ignored) or right swipe (interested)
        const allowedStatus = ["interested", "ignored"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status type: " + status});
        }

        // validation that toUser is even exists or not
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message: "user not found"});
        }

        // validation that fromUser != toUser 
        const isSameUser = fromUserId === toUserId;
        if(!isSameUser){
            return res.status(400).json({message: "receiver can not be same as sender"});
        }

        // validation if request is already sent: user A to user B or user B to user A
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ],
        });
        if(existingConnectionRequest){
            return res.status(400).send({message: "Connection Request Already Exists"});
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.json({
            message: "Connection request Sent Successfully",
            data,
        });

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
        
    }

    // const user = req.user;
    // // sneding a connection request
    // console.log("sneding a connection request");

    // res.send(user.firstName+" "+user.lastName+ " send the Connection request!");
})

module.exports = requestRouter;