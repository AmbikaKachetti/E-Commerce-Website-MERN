
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

// Database connection with MongoDB || initialized the DB using mngoose connect
mongoose.connect(
    "mongodb+srv://katyayini:ecommerce@cluster0.enm9w.mongodb.net/ecommerce",
)
.then(() => console.log("MongoDB connected successfully"))
.catch((error) => console.log("MongoDB connection error:", error));

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
    // sizes: {
    //     type: [String], // Example: ["S", "M", "L", "XL"]
    //     default: [],
    // },
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
        // id: id,
        id: Date.now(), // Setting a unique id based on the current timestamp
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        // sizes: req.body.sizes, // Accept sizes from the request
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    });
})

// Creating API for deleting Products
app.post('/removeproduct', async (req, res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        succes: true,
        name: req.body.name
    })
})

// Creating API for getting all Products
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
/*
app.post('/signup', async (req, res) => {
    // to check email and password already existing or not ?
    let check = await Users.findOne({email:req.body.email});
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
    const token = jwt.sign(data, 'secrete_ecom'); // salt - adding one layer by this our data will encrypted by one layer
    res.json({success: true,token})
})
    */
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, errors: "User with this email address already exists" });
        }

        // Initialize cart data (optional logic)
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new Users({
            name: username,
            email,
            password: hashedPassword,
            cartData: cart,
        });
        await user.save();

        // Generate JWT token
        const data = {
            user: {
                id: user.id,
            },
        };
        const token = jwt.sign(data, 'secrete_ecom', { expiresIn: '1h' }); // Token expires in 1 hour

        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, errors: "Internal Server Error" });
    }
});

// Creating endpoint for user login
/*
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
*/

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, errors: "Wrong Email ID" });
        }

        // Compare provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, errors: "Wrong Password" });
        }

        // Generate JWT token
        const data = {
            user: {
                id: user.id,
                name: user.name, // Include user name if needed
                email: user.email, // Include user email if needed
            },
        };
        const token = jwt.sign(data, 'secrete_ecom', { expiresIn: '1h' }); // Token expires in 1 hour

        res.json({ success: true, token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, errors: "Internal Server Error" });
    }
});

// Creating endpoint for the newcollection data
app.get('/newcollections', async (req, res)=>{
    let products = await Product.find({});
    let newcololection = products.slice(1).slice(-8); // we will get recently added 8 products
    console.log("NewCollection Fetched");
    res.send(newcololection);
})

// Creating endpoint for popular in women section
app.get('/popularinwomen', async (req, res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0, 4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})

// Creating endpoint for adding products in cartdata
app.post('/addtocart', async (req, res)=> {
    console.log(req.body);
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

