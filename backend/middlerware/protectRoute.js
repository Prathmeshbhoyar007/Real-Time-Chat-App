//Import necessary modules
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js'

//Middleware to protect routes requiring authentication
const protectRoute =  async (req, res, next) => {
    try {
        //Get JWT token from the request cookies
        const token = req.cookies.jwt;

        //Check if token is not provided
        if(!token) {
            return res.status(401).json({error: "Unauthorized - No Token Provided"})
        }

        //Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRETE);

        //Check if token is invalid
        if(!decoded) {
            return res.status(401).json({error: "Unauthorized - Invlaid Token"})
        }

        //Find user by decoded userId, excluding the password
        const user = await User.findById(decoded.userId).select("-password")

        //Check if user is not found
        if(!user) {
            return res.status(401).json({error: "User not found"})
        }

        // Attach user information to the request obejct
        req.user = user
        //Move to the next middleware or route handler
        next()

    } catch (error) {
         // Handle errors and send appropriate response
        console.log("Error in protectRoute middlerware: ", error.message);
        res.status(500).json({ error: 'Internal server error'})
    }
}

// Export the protectRoute middleware for external use
export default protectRoute;