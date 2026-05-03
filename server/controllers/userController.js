import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const signUp = async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        const existingUser = await User.findOne({email})

        if (existingUser) {
            return res.status(400).json({message:"User already exist."})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await User.create({
            name,
            email,
            password:hashedPassword
        });

        

        res.status(201).json({message:"SignUp successfully",user:{
            id:newUser._id,
            name:newUser.name,
            email:newUser.email
        }})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"Fill all required fields."})
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message:"User does not exists"})
        }

        const isMatchPassword = await bcrypt.compare(password,user.password)
        if (!isMatchPassword) {
            return res.status(400).json({message:"Password is incorrect"})
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})


        res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    } catch (error) {
         res.status(500).json({message:error.message})
    }
}