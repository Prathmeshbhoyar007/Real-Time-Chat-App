//Import require modules
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { app, server } from './socket/socket.js'
import path from 'path'

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'


import connectToMongoDB from './db/connectToMongoDB.js';

//Create an instance of Express app
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()
//Load environment variables from .env file
dotenv.config();

// Middleware setup
app.use(express.json())  // Parse incoming requests with JSON payloads (from req.body)
app.use(cookieParser()) // Parse cookies in incoming requests

//Routes setup
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})
//Start the server and connect to MongoDB
server.listen(PORT, () => {
    connectToMongoDB(); // Call the function to connect to MongoDB
    console.log(`Server is running on port ${PORT}`)
})