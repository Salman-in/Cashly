const mongoose = require("mongoose");
require('dotenv').config({ path: '.env' }); //To configure the env path
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL);

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        // required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        // required: true,
        trim: true,
        maxLength: 50
    },
    username: {
        type: String,
        // required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        // required: true,
        minLength: 6
    },
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        required: true
    },
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User, Account
}; 