require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();


connectDB();


app.use(express.json());


// serve images
app.use("/uploads", express.static("public/uploads"));


// routes
const menuRoutes = require("./routes/menuRoutes");

app.use("/api/menu", menuRoutes);



const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});