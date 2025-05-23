const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema(
    {

        //senderUser
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        //receiveruser
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        status: {
            type: String,
            enum: {
                values: ["interested", "ignored", "accepted", "rejected"],
                message: `{Value} is incorrect status type`
            }
        }
    },
    { timestamps: true }
);

// COMPOUND INDEXING
// ConnectionRequest.find({fromUserId: 12345678, toUserId: 234567898765 });
connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

connectionRequestSchema.pre("save", function(next) {
    const connectionRequest = this;

    // checks toUser and fromUser are not same
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to youself");
    }
    next();
})
// pre is a mongoose middleware hook
// "save" is as event handler or action
// "save": the hook trigger
// run middleware pre function() before save event
// cannot use arrow function here bcz of this keyword 
// .equals() is strictly compare like === 
// used to compare objects

const ConnectionRequestModel = new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
);
// Model always starts with caps

module.exports = ConnectionRequestModel;