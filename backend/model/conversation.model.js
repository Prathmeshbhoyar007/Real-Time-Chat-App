// Import Mongoose library
import mongoose from "mongoose"

// Define Conversation Schema
const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: [],
        }
    ]
}, {timestamps: true})

// Create Conversation model from the schema
const Conversation = mongoose.model("Conversation", conversationSchema)

// Export the Conversation model for external use
export default Conversation;