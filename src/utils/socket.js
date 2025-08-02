const { disconnect } = require("process");
const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const { timeStamp } = require("console");
const ConnectionRequest = require("../models/connectionReq");


const initializeSocket = (server) => {

    // To handle cors issues
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173"
        },
    })

    // how you accept connections
    // you start listening to connections
    io.on("connection", (socket) => {
        // handle events

        socket.on("joinChat", ({ firstName, userId, targetUserId}) => {
            // create a seprate room for only these two users
            // each room should have a unique id
            // users connect via room

            // const room = "uniqueId";
            const roomId = [userId, targetUserId].sort().join("_");

            // console.log(firstName + " joined room : ", roomId);

            socket.join(roomId);
        });
        // step: 1.a  listening the message on backend and transfer it to the room
        socket.on("sendMessage", async ({firstName, lastName, userId, targetUserId, text}) => {
            
            // save messages to the DB
            try {

                const roomId = [userId, targetUserId].sort().join("_");
                // console.log(firstName + " " + text);

                // chat exists OR
                // new chat started
                // TODO: check if userId and targetUserId are friends
                // bcz anyone can find id from console or redux store
                // and change URL to send messsage randomly

                const isFriend = ConnectionRequest.findOne({
                    status: "accepted",
                    $or: [
                        {fromUserId: userId, toUserId: targetUserId }, 
                        {fromUserId: targetUserId, toUserId: userId}
                    ]
                })

                if(!isFriend){
                    console.log("Message Blocked: Not friends");
                    return;
                }

                let chat = await Chat.findOne({
                    participants: {$all: [userId, targetUserId ]},
                });

                if(!chat){
                    chat = new Chat({
                        participants: [userId, targetUserId],
                        messages: []
                    })
                }

                chat.messages.push({
                    senderId: userId,
                    text,
                })
                await chat.save();
                // time theek krle phle
                const date = new Date();
                const formatedDate = date.toLocaleTimeString("en-In", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });

                // step: 2. a return msg back to frontend after save
                io.to(roomId).emit("messageReceived", { firstName, lastName, text, timeStamp: formatedDate});

            } catch (err) {
                console.log(err);
            }
            
        });

        socket.on("disconnect", () => {

        });


})
};

module.exports = initializeSocket;