import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/routes.js";
import connectMongoDB from "./db/db.js";

const app = express();

connectMongoDB();

dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);


const PORT = process.env.PORT  || 5000;

app.get("/" ,(req ,res) => {
    res.send("hello world!");
});



app.listen(5000, () => {
    
    console.log("Server running on port 5000");
});