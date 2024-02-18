//Import necessary modules
import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js";


//Handle sending message
export const sendMessage = async (req, res) => {
    try {
        //Extract message data from the request body and params
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        //Find  or create a conversation between sender and receiver
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId]},
        })
        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }
        
        //Create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        //Associate the message with the conversation
        if(newMessage) {
            conversation.messages.push(newMessage._id)
        }

        //Save the message and send success response
        // await conversation.save();
        // await newMessage.save();

        await Promise.all([conversation.save(), newMessage.save()])

        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId) {
            //io.to(socket_id).emit used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)

    } catch (error) {
        //Handle errors and send appropriate response
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json( { error: "Internal server error" })   
    }
}

// Handling getting message
export const getMessage = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate("messages") // Not Reference but actual messages

        if(!conversation) return res.status(200).json([])

        const messages = conversation.messages

        res.status(200).json(messages)
        
    } catch (error) {
        //Handle errors and send appropriate response
        console.log("Error in getMessage controller: ", error.message);
        res.status(500).json( { error: "Internal server error" })   
    }
}