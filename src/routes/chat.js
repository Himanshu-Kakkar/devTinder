const express = require('express');
const { Chat } = require('../models/chat');
const { userAuth } = require('../middlewares/auth');

const chatRouter = express.Router();
const chatDeleteRouter = express.Router();
const chatTrimRouter = express.Router();

// To add messages in an array to save in DB
chatRouter.get("/chat/:targetUserId", userAuth ,async (req, res)=> {
    const {targetUserId} = req.params;
        const userId = req.user._id;
    try {
        let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId]}
        }).populate({
            path: "messages.senderId",
            select: "firstName lastName",
        })
        if(!chat){
            chat = new Chat( {
                participants: [userId, targetUserId],
                messages: [],
            });
            await chat.save();
        }
        res.json(chat);
    } catch (err) {
        console.log("Error in fetching prev messages from DB", err);
    }
});

// To delete the whole array
chatDeleteRouter.delete('/delete-chat/:targetUserId', userAuth, async (req, res) => {
  const userId = req.user._id; // assuming verifyUser middleware sets this
  const { targetUserId } = req.params;

  try {
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    chat.messages = []; // clear messages array
    await chat.save();

    res.status(200).json({ message: 'Chat cleared' });
  } catch (err) {
    console.error('Error clearing chat:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// To trim the array 
// delete old messages
// keep latest 20 messages only
// TODO
chatTrimRouter.post("/chattrim/:roomId", userAuth, async (req, res) => {

    try {
        const { roomId } = req.params;
        console.log(roomId);
        // Step 1: Get all messages for this room, latest first
        const messages = await Message.find({ roomId }).sort({ createdAt: -1 });

        // Step 2: If 20 or fewer messages, nothing to delete
        if (messages.length <= 20) {
        return res.status(200).json({ message: "No trimming needed." });
        }

        // Step 3: Extract messages beyond the most recent 20
        const messagesToDelete = messages.slice(20); // Keep first 20, delete rest

        // Step 4: Collect their IDs
        const deleteIds = messagesToDelete.map(msg => msg._id);

        // Step 5: Delete messages in bulk using their IDs
        await Message.deleteMany({ _id: { $in: deleteIds } });

        // Step 6: Respond with success
        res.status(200).json({ message: "Old messages trimmed." });
        
    } catch (err) {
        console.error("Trim error:", err);
        res.status(500).json({ error: "Server error while trimming." });
    }
})

module.exports = {chatRouter, chatDeleteRouter, chatTrimRouter};