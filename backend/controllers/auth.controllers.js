//Import necessary modules
import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import generateTokenAndSetCookie from "../utils/generateJWT.js";

//Handle user registration
export const signup = async (req, res) => {
  try {
    //Extract user data from the request body
    const { fullName, userName, password, confirmedPassword, gender } =
      req.body;

      //Check if password match
    if (password !== confirmedPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }

    //Check if username already exists
    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // hash password using bcrypt
    const salt = await bcrypt.genSalt(10); // default is 10, higher is value more is secure but gets slower to load.
    const hashedPassword = await bcrypt.hash(password, salt);
    // https://avatar-placeholder.iran.liara.run/

    //Generate profiles picture URLs based on gender
    const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    //Create a new user object
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePicture:
        gender === "male" ? boyProfilePicture : girlProfilePicture,
    });

    if (newUser) {
      // Generate JWT token and set it as a cookie
      generateTokenAndSetCookie(newUser._id, res);
      //save the user to database
      await newUser.save();

      //Send success response
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    // Handle errors and send appropriate resposen 
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Handle user login
export const login = async (req, res) => {
 try {
  //exract login credentials from the request body
  const {userName, password} = req.body;

  //find user by username
  const user = await User.findOne({userName})

  // Check if user exists and password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

  if(!user || !isPasswordCorrect) {
    return res.status(400).json({error: "Invlaid username or password"})
  }

  //Generate JWT token and set it as a cookie
  generateTokenAndSetCookie(user._id, res);

  //Send success response
  res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        profilePicture: user.profilePicture,
  })
  
 } catch (error) {
  //Handle errors and send appropriate response
  console.log("Error in login controller", error.message);
  res.status(500).json({ error: "Internal Server Error" });
 }
};

//Handle user logout
export const logout =  (req, res) => {
  try {
    //Clear the JWT cookie
    res.cookie("jwt", "", {maxAge: 0});

    //Send success response
    res.status(200).json({message: "Logged out successfully"})
  } catch (error) {
    //Handle errors and send appropriate response
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
