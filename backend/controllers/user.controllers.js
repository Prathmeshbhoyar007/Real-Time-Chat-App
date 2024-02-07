import User from "../model/user.model.js";

// Controllers to get users for the logged-in user from the request object
export const getUsersForSidebar = async (req, res) => {
    try {

        //Get the ID of the logged-in user from the request object 
        const loggedInUserId = req.user._id;

        //const allUsers = await User.find()  //all user including itself and it send message to itself also
         
         //Fetch users excluding the logged-in user
        const filterUsers = await User.find({ _id: { $ne: loggedInUserId}}).select('-password') // all user except  itself (loggedInUser) 

        //respond with the filtered users
        res.status(200).json(filterUsers)
         
    } catch (error) {
    //Handle errors and provide a generic error message
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error"})
    }
}