import jwt from "jsonwebtoken";

const generateToken = (userId , res) => {
    const token = jwt.sign({userId}, "BZd73ljKMBeOe66Y169BPcyNnUWhW1qEx/wfTcysYDQ=",{
        expiresIn: '15d'
    })
    res.cookie("jwt" , token,{
        maxAge: 15 * 24 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: "development" !== "development",
    });
};

export default generateToken;