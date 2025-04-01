const express = require("express");
const mongoose = require("mongoose");
const authroutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require('cors');


const PORT = process.env.PORT || 5000;
const db = process.env.DB_URI;
const app = express();

app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
    origin: 'http://localhost:5173', // Change this to your frontend URL
    credentials: true, // Allow sending cookies and authentication headers
}));

app.use("/api/auth", authroutes);
app.use("/api/notes", notesRoutes);

mongoose.connect(db).then(() => {
    console.log("Connected to DB successfully");
}).catch((err) => {
    console.error("Could not connect to MongoDB:", err);
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
