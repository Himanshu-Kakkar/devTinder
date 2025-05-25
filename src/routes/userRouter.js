const express = require('express');
const { userAuth } = require("../middlewares/auth.js");
const connectionRequest = require("../models/connectionReq.js");
const User = require("../models/user.js");

const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the pending connection request for the logged in user
userRouter.get("/user/requests/received", userAuth, async (req,res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await connectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId",USER_SAFE_DATA);

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

// get all the connections of logged In User
userRouter.get("/user/connections", userAuth, async (req,res)=> {
    try {
        const loggedInUser = req.user;
        // logged in user can be toUser or fromUSer ststus should be accepted then its a connection
        const connectionRequests = await connectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"}
            ],
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map((row)=> {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()) // comparing 2 object ids directly can give unexpected results
                 return row.toUserId;
            return row.fromUserId; });

        res.json({data});

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

userRouter.get("/feed", userAuth, async(req,res)=> {
    try {

        const loggedInUser = req.user;
        // /feed?page=1&limit=10
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;

        // user see all the cards except
        // his own card
        // his connections
        // ignored peoples
        // already sent the connection request

        // find all connection requests (sent + received)

        const connectionRequests = await connectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id},
                { toUserId: loggedInUser._id}
            ],
        })
          .select('fromUserId toUserId')
        //   .populate("fromUserId", "firstName")
        //   .populate("toUserId", "firstName");
        // These users are not shown in feed
        
        const hiddenUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hiddenUsersFromFeed.add(req.fromUserId.toString());
            hiddenUsersFromFeed.add(req.toUserId.toString())
        })

        const users = await User.find({
            $and: [
                {_id: {$nin: Array.from(hiddenUsersFromFeed)}},
                {_id: {$ne: loggedInUser._id}},
            ],
            
        })
        .select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit);

        res.send(users);

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

module.exports = userRouter;