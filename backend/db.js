const mongoose = require("mongoose");
require('dotenv').config({ path: '.env' }); //To configure the env path
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL);

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
})

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}; 