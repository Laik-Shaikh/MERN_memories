const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

export const authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomToken = token.length < 500;
    let decodedData;
    if (token && isCustomToken) {
      decodedData = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};
