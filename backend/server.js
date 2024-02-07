//Import require modules
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

//Import routes and MongoDB connection function
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import connectToMongoDB from './db/connectToMongoDB.js';

//Create an instance of Express app
const app = express();
const PORT = process.env.PORT || 5000;

//Load environment variables from .env file
dotenv.config();

// Middleware setup
app.use(express.json())  // Parse incoming requests with JSON payloads (from req.body)
app.use(cookieParser()) // Parse cookies in incoming requests

//Routes setup
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//     // root route http://localhost:5000/
//     res.send("Route is running perfectly!! Using Nodemon script.")
// })

//Start the server and connect to MongoDB
app.listen(PORT, () => {
    connectToMongoDB(); // Call the function to connect to MongoDB
    console.log(`Server is running on port ${PORT}`)
})