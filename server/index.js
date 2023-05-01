const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello Server");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});
