import express from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import authRoutes from "./routes/routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectMongoDB from "./db/db.js";

const app = express();

connectMongoDB();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


// const PORT = process.env.PORT  || 5000;

app.get("/" ,(req ,res) => {
    res.send("hello world!");
});



app.listen(5000, () => {
    
    console.log("Server running on port 5000");
});