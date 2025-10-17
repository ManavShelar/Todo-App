import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"

export const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});

    if(!user) {
      return res.status(400).json({message: "Invalid Credentials"});
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) {
      return res.status(400).json({message: "Invalid Credentials"});
    }

    generateToken(user._id, res)
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      message:"sucess"
    })

  } catch (error) {
    console.log("Error in login controller",error.message);
    res.status(500).json({message: "Internal server Error"})
  }
};

export const signup = async (req, res) => {
  const {username, email, password} = req.body
  try {

    if(!username || !email || !password){  
    return res.status(400).json({message: "All fields are required"})
    }

    if(password.length < 6) {
      return res.status(400).json({ message: "Your password must be atleast 6 characters"})
    }
    const user = await User.findOne({email})

    if(user) return res.status(400).json({ message: "Email already exists"})

    const salt = await bcrypt.genSalt(10)
    
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword
    })

    if(newUser){
      generateToken(newUser._id, res)
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      })

    }else{
      return res.status(400).json({message: "Invalid user data"})
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({message: "Internal server error"})
  }
}

export const logout = ((req, res) => {
  try {
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({message: "User Loged Out Sucessfully"});
  } catch (error) {
    console.log("Error in logout controller",error.message);
    res.status(500).json({message: "Internal server Error"})
  }
})

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller",error.message);
    res.status(500).json({message: "Internal server Error"})
  }
}
 