const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect(
    "mongodb+srv://katyayini:ecommerce@cluster0.enm9w.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("MongoDB connected successfully"))
.catch((error) => console.log("MongoDB connection error:", error));

// API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});
// Image Storage Engione - multer - congiguration
const storage = multer.diskStorage({
    destination: './upload/images', 
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage:storage})
// Creating upload endpoint for images
app.post("/upload",upload.single('product'), (req, res)=> {
    
})

// Server listen
app.listen(port, () => {
    console.log("Server Running on Port " + port);
});

