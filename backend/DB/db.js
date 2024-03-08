import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
       await mongoose.connect('mongodb://localhost:27017/users');
       console.log("connected to mongoDB");
    } catch (error) {
        console.log("invalid error" , error.message);
    }
};

export default connectMongoDB;