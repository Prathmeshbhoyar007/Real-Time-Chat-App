//Import necessary library
import { mongoose } from "mongoose";

//Define User Schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePicture:{
        type: String,
        default: "",
    }
}, { timestamps: true }) //Include timestamps for createdAt and updatedAt

//Create User model from the schema
const User = mongoose.model("User", userSchema)

//Export the User model for external use
export default User;