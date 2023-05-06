const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');


// import 
const connection = require('./db/connection');
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

const corsConfig = {
  origin: true,
  credentials: true,
};

const app = express();
app.use(cors(corsConfig));
dotenv.config();
connection();

app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

app.get("/", (req, res) => {
  res.send("Hello Server!");
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});
