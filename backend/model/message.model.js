//Import Mongoose library
import mongoose from "mongoose"

//Define Message schema
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {timestamps: true});

// Create Message model from the schema
const Message = mongoose.model("Message", messageSchema)

// Export the Message model for external use
export default Message;