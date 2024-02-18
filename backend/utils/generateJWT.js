// Import the jsonwebtoken library
import jwt from 'jsonwebtoken'

// Function to generate a JWT token and set it as a cookie in the response
const generateTokenAndSetCookie = (userId, res) => {
     // Generate a JWT token with the user's ID and sign it with the secret key
    const token = jwt.sign({userId}, process.env.JWT_SECRETE, {
        expiresIn: '15d' // Token expiration time set to 15 days
    })

    // Set the JWT token as a cookie in the response
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,  // Cookie max age set to 15 days in milliseconds
        httpOnly: true,  // prevent XSS cross site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== 'development' // Use secure cookie in production environment
    })
}

// Export the generateTokenAndSetCookie function for external use
export default generateTokenAndSetCookie;