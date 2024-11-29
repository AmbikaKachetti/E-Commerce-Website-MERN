
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bcrypt = require('bcrypt'); // bcrypt is a widely-used library for hashing passwords securely.

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

// Schema creating for user model
const Users = mongoose.model('Users',{
    name: {
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData:{
        type: Object,
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

// Creating end point for registering the user
app.post('/signup', async (req, res) => {
    // to check email and password already existing or not ?
    let check = await Users.findOne({email: req.body.email});
    if(check){
        return res.status(400).json({success: false, errors: "existing user found with same email address"})
    }
    // if no user found, we will creat one empty cart here
    let cart = {};
    for(let i = 0; i < 300; i++){
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        passwrod: req.body.password,
        cartData: cart,
    })
    await user.save();

    // jwt authentication
    const data = {
        user:{
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secrete_ecom'); // salt - adding one layer
    res.json({success: true,token})
})

// Creating endpoint for user login

// bcrypt

// app.post('/login', async (req, res) => {
//     let user = await Users.findOne({ email: req.body.email });
//     if (user) {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);

//         const passwordCompare = await bcrypt.compare(req.body.password, user.password);
//         if (passwordCompare) {
//             const data = {
//                 user: {
//                     id: user.id
//                 }
//             };
//             const token = jwt.sign(data, 'secrete_ecom');
//             res.json({ success: true, token });
//         } else {
//             res.json({ success: false, errors: "Wrong Password" });
//         }
//     } else {
//         res.json({ success: false, errors: "Wrong Email ID" });
//     }
// });


app.post('/login', async (req, res) => {
    let user = await Users.findOne({email: req.body.email});
    if(user){
        const passwordCompare = req.body.password === user.password; // this kind of compraison of pwd is not recommended for production level applications
        if(passwordCompare){
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secrete_ecom');
            res.json({success: true, token});
        }
        else{
            res.json({success: false, errors: "Wrong Password"});
        }
    }
    else{
        res.json({success: false, errors: "Wrong Email ID"});
    }
})

// with expiration time


// const bcrypt = require('bcrypt'); // Import bcrypt for password comparison
// const jwt = require('jsonwebtoken'); // Ensure you have jwt for generating tokens

// app.post('/login', async (req, res) => {
//     try {
//         // Fetch the user by email from the database
//         const user = await Users.findOne({ email: req.body.email });
        
//         if (!user) {
//             return res.json({ success: false, errors: "Wrong Email ID" });
//         }

//         // Compare the plaintext password with the stored hashed password
//         const passwordCompare = await bcrypt.compare(req.body.password, user.password);
        
//         if (!passwordCompare) {
//             return res.json({ success: false, errors: "Wrong Password" });
//         }

//         // Create JWT payload and generate a token
//         const data = {
//             user: {
//                 id: user.id
//             }
//         };
//         const token = jwt.sign(data, 'secrete_ecom', { expiresIn: '1h' }); // Optional: Add an expiration time
        
//         // Respond with success and the token
//         res.json({ success: true, token });
//     } catch (err) {
//         console.error("Error in /login route:", err);
//         res.status(500).json({ success: false, errors: "Internal Server Error" });
//     }
// });


// Server listen
app.listen(port, (error) => {
    if(!error){
        console.log("Server Running on Port " + port);
    }
    else{
        console.log("Error : " + error)
    }
});

