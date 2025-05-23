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

const ConnectionRequestModel = new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
);
// Model always starts with caps

module.exports = ConnectionRequestModel;