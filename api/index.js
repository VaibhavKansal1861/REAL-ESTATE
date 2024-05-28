const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes.js");
const listingRoute = require("./routes/listing.route.js");
const userRoutes = require("./routes/user.routes.js");
const path = require("path");
dotenv.config();


mongoose.connect(process.env.MONGO).
then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.log("Error connecting to MongoDB", err);
});

const __resname=path.resolve();

const app = express();
app.use(express.json());
app.use(cors()); 

app.use(cookieParser());

app.listen(3001,()=>{
  console.log('Server is running on port 3001!');
});

app.use("/users",userRoutes);
app.use("/auth",authRoutes);
app.use("/listing",listingRoute);

app.use(express.static(path.join(__resname,'/client/dist')));
app.get('*',(req,res)=>{
  res .sendFile(payh.join(__resname,'client','dist','index.html'));
});

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error"
  res.json({
    success : false,
    message : message,
    statusCode : statusCode
  })
})

app.listen(3000, () => {
  console.log("Server is running on port 3001");
});
