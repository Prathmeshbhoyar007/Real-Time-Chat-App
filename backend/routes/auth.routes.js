// Import necessary modules
import express  from "express";
import { signup, login, logout } from "../controllers/auth.controllers.js";

// Create an instance of the Express router
const router = express.Router()

// Define routes for user authentication
router.post("/signup", signup ) // Route for user registration
router.post("/login", login) // Route for user login
router.post("/logout", logout)  // Route for user logout

// Export the router for external use
export default router;