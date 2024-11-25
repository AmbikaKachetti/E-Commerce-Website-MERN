
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
    "mongodb+srv://katyayini:ecommerce@cluster0.enm9w.mongodb.net/ecommerce",
)
// .then(() => console.log("MongoDB connected successfully"))
// .catch((error) => console.log("MongoDB connection error:", error));

// API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image Storage Engione - multer - configuration -middleware
const storage = multer.diskStorage({
    destination: './upload/images', 
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
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

// Schema for creating Products
const Product = mongoose.model("Product", {
    id:{
        type: Number,
        required: true,
        unique: true,
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
        type: String,
        required: true,
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

// Creating API endpoint for creating new product
app.post('/addproduct', async (req, res)=>{
    let products = await Product.find({}); // we will get all products in one array, and we can access that using this "products"
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id: 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    });
})

// app.post('/addproduct', async (req, res) => {
//     try {
//         // Fetch all products from the database
//         let products = await Product.find({}); 
        
//         let id;
        
//         // If products exist, get the last product's id and increment it by 1
//         if (products.length > 0) {
//             let last_product = products[products.length - 1];  // Get the last product
//             id = last_product.id + 1;  // Increment the id by 1
//         } else {
//             id = 1;  // If no products exist, start with id 1
//         }

//         // Create a new product with the calculated or assigned id
//         const product = new Product({
//             id: id,
//             name: req.body.name,
//             image: req.body.image,
//             category: req.body.category,
//             new_price: req.body.new_price,
//             old_price: req.body.old_price,
//         });

//         // Save the product to the database
//         await product.save();

//         console.log("Product Saved:", product);
        
//         // Return the success response
//         res.json({
//             success: true,
//             name: req.body.name,
//             id: product.id,  // Return the id of the newly created product
//         });
//     } catch (error) {
//         console.error("Error saving product:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// Creating API endpoint for creating new product

app.post('/removeproduct', async (req, res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        succes: true,
        name: req.body.name
    })
})

// Creating API for getting all products
app.get('/allproducts', async (req, res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// Server listen
app.listen(port, (error) => {
    if(!error){
        console.log("Server Running on Port " + port);
    }
    else{
        console.log("Error : " + error)
    }
});

