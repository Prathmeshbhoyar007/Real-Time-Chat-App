import User from "../model/user.model.js";

// Controllers to get users for the logged-in user from the request object
export const getUsersForSidebar = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;

        //const allUsers = await User.find()  //all user including itself and it send message to itself also
         
        const filterUsers = await User.find({ _id: { $ne: loggedInUserId}}).select('-password') // all user except  itself (loggedInUser) 

        res.status(200).json(filterUsers)
         
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error"})
    }
}