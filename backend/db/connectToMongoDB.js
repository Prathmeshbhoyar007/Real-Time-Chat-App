//Import the mongoose library
import { mongoose } from "mongoose";

//Function to connect to MongoDB
const connectToMongoDB = async () => {
    try {
        //Attemp to connect to MongoDB using the provided URL
        await mongoose.connect(process.env.MONGO_DB_URL)
        //Log a success message if the connection is successful
        console.log("Connected to MongoDB");
    } catch (error) {
        //Log an error message if there's an issue connecting to MongoDB
        console.log("Error connecting to MongoDB", error.message);
    }
}

//Export the connectToMongoDB function for external use
export default connectToMongoDB