const mongoose = require("mongoose");
const { type } = require("os");
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        require: true,
    },
    },
    {
        timestamps: true,
    }
)


const chatSchema = new mongoose.Schema({
    // chat can be extended to group chat
    // later feature TODO
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    }],
    // chat model restricted to only two people
    // senderId: {},
    // receiverId: {},
    messages: [messageSchema],

});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = { Chat };