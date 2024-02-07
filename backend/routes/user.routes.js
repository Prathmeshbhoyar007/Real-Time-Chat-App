import express from 'express'
import protectRoute from '../middlerware/protectRoute.js';
import { getUsersForSidebar } from '../controllers/user.controllers.js';

const router = express.Router()

//Use a more decriptive path for the sidebar route
router.get("/sidebar", protectRoute, getUsersForSidebar)

export default router;