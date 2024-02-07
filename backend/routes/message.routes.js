// Import necessary modules
import express from "express"
import { sendMessage, getMessage } from '../controllers/message.controller.js'
import protectRoute from "../middlerware/protectRoute.js";

// Create an instance of the Express router
const router = express.Router()

// Define route for sending messages, protected by authentication
router.get("/:id", protectRoute, getMessage)
router.post("/send/:id", protectRoute, sendMessage)

// Export the router for external use
export default router;