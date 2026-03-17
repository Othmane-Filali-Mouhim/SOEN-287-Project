import express from 'express';
import { connectDB } from "./db.js";  



const port = process.env.PORT || 8080
const app = express();



connectDB();


app.listen(port, ()=>console.log(`Server is running on port ${port}`))