const express = require('express');
const app = express();

const cors = require('cors');
app.use(
  cors({
    origin: ["http://localhost:5174","http://localhost:5173"],
    credentials: true
  })
);

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;

const connectDB = require('./db/db_conn');// Connect to MongoDB
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const admRoutes = require('./routes/admRoutes');
const ProductRoutes = require('./routes/productRoutes');


app.use(express.json());// Middleware to parse JSON bodies

//Routing
app.get('/',(req,res)=>{
    return res.send('this is the default backend routing');
})

app.use("/api/admin",admRoutes)
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/product",ProductRoutes);

//listening to the server
app.listen(PORT, () => {
  console.log('HELLO USER WELCOME TO E-CART BACKEND');
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
