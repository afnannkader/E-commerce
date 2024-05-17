const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const session = require('express-session')
const User = require('./models/user')
const Login = require('./utilites/Login');
const Register = require('./utilites/Register');
const Crud = require('./utilites/Crud');
const Cart = require('./utilites/Cart')
const { Product } = require('./models/product');

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(express.json())
const port = 5000;

app.use(session({
  secret: 'abcdefg',
  resave: false,
  saveUninitialized: true,
}));

//connectong to mongodb
mongoose.connect('mongodb://localhost:27017/ECommerce')
  .then(() => console.log("connected to MongoDB.."))
  .catch((err) => console.error(err));

//CRUD Operation
//create the new product
app.post("/create", async (req, res) => {
  Crud.Create(req, res);
});

//Get the all product list
app.get('/read', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the page number from query parameters, default to 1 if not provided
  const perPage = 4; // Number of products per page

  try {
    const totalCount = await Product.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);
    
    // Calculate the skip value based on the page number
    const skip = (page - 1) * perPage;

    // Fetch products for the specified page
    const productList = await Product.find().skip(skip).limit(perPage);

    const result = {
      list: productList,
      count: productList.length,
      totalPages: totalPages,
      currentPage: page
    };

    res.json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
});


//Update a product based on the id
app.put("/update/:id", async (req, res) => {
  Crud.Update(req, res);
});

//Delete a product based on the id
app.delete("/delete/:id", async (req, res) => {
  Crud.Delete(req, res);
});
//CRUD Operation  Ends Here

//Register:-
app.post('/register', async (req, res) => {
  Register.Register(req, res);
});

//Login:-
app.post('/login', async (req, res) => {
  Login.Login(req, res);
  
})

//cart
// app.post("/cart", async (req, res) => {
//   Cart.Cart(req, res);
// })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})