const mongoose = require("mongoose");

const addPasswords = new mongoose.Schema({
    Website: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    }
    
});

const addPassword = new mongoose.model("addPassword",addPasswords);


module.exports = addPassword;