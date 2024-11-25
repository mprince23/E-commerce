const express = require("express");
const app = express();
require('dotenv').config();
const connectDB = require('./config/db')
const router = require('./routes/index')
const cors = require('cors');
const cookieParser = require("cookie-parser");

connectDB()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api', router)

app.listen(8080, () => {
    console.log("Server is Running on port 8080");
});