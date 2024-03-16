import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
       await mongoose.connect("mongodb+srv://youtube3:20170262293@cluster0.spptqjd.mongodb.net/chat");
       console.log("connected to mongoDB");
    } catch (error) {
        console.log("invalid error" , error.message);
    }
};

export default connectMongoDB;