const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connection = () => {
  mongoose
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database Connected Successfully.")
    })
    .catch((error) => {
      console.log(error.message);
      console.log("Failed to Connect Database.");
    });
};

mongoose.set("strictQuery",false);
module.exports = connection;
