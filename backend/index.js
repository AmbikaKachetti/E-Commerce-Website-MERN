const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { log } = require("console");

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
app.use('/images', express.static('upload/images'))

app.post("/upload",upload.single('product'), (req, res)=> {
    res.json({
        success: 1, 
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for Creating Products

const Product = mongoose.model("Product", {
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    },
})

// end point for add product
app.post('/addproduct', async (req, res)=>{
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved in DB");
    res.json({
        succes: true,
        name: req.body.name,
    })
})

// Server listen
app.listen(port, () => {  
    console.log("Server Running on Port " + port);
});

