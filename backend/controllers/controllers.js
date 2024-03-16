import bcrypt from "bcryptjs"; 
import User from "../models/user.model.js";
import generateToken from "../utils/token.js";

export const signup = async (req ,res) => {
    try {
        const{fullname , username , password , confirmPassword , gender} = req.body;
        console.log(req.body);
        // console.log("hon")

        if(password !== confirmPassword){
            return res.status(400).json({error:"passwords don't match"})
        }
        console.log("hone")
        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"username already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password : hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,

        })
        // console.log("honey")

        if(newUser){
        generateToken(newUser._id , res);
        await newUser.save();
        res.status(201).json({
            _id : newUser._id,
            fullname : newUser.fullname,
            username : newUser.username,
            profilePic : newUser.profilePic,

        })

    } else{
        res.status(400).json({error: "Invalid user data"});
    }

    } catch (error) {
        console.log("error in signup controller", error.messsage);
        res.status(500).json({error:"inrernal server error"});
    }
};

export const login = async (req ,res) => {
    try {
        const {username , password} = req.body;
        console.log(req.body);
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password , user?.password || "");
        
        if(!user || !isPasswordCorrect){
            return res.status(404).json({error: "invalid username or password"});
        }

        generateToken(user._id , res);
        res.status(201).json({
            _id : user._id,
            fullname : user.fullname,
            username : user.username,
            profilePic : user.profilePic,
        });

    } catch (error) {
        console.log("error in login controller", error.messsage);
        res.status(500).json({error:"inrernal server error"});
    }
};

export const logout =  (req ,res) => {
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message:"logged out successfully"});
    } catch (error) {
        console.log("error in logout controller", error.messsage);
        res.status(500).json({error:"inrernal server error"});
    }
};


