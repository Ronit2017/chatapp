import User from "../models/user.model.js";

export const signup = async (req ,res) => {
    try {
        const{fullname , username , password , confirmPassword , gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"passwords don't match"})
        }
        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"username already exists"})
        }
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })
        await newUser.save();
        res.status(201).json({
            _id : newUser._id,
            fullname : newUser.fullname,
            username : newUser.username,
            profilePic : newUser.profilePic,
        })
    } catch (error) {
        console.log("error in signup controller", error.messsage);
        res.status(500).json({error:"inrernal server error"});
    }
};

export const login = (req ,res) => {
    console.log("loginUser");
};

export const logout = (req ,res) => {
    console.log("logoutUser");
};


