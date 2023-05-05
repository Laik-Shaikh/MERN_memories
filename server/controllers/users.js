const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()

exports.signUp = async (req, res) => {
    const { firstName, lastName, password, confirmPassword, email } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "User Already Exists." });

        if(password.length < 6) return res.status(400).json({ message: "Password must be of atleast 6 character long." });

        if(password !== confirmPassword) return res.status(400).json({ message: "Confirm Password Doesn't Match." });

        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            name: `${firstName} ${lastName}`,
            email,
            password: hashPassword
        });

        const token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
        
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Something Went Wrong!" });
    }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User Doesn't Found." });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Incorrect Password." });

    const token = await jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Something Went Wrong!" });
  }
};
