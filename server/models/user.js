const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: truw
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

const User = mongoose.model("user", userSchema);
module.exports = User;