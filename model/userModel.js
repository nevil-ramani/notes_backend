const mongoose = require('mongoose');


// const uniqueValidator = require('mongoose-unique-validator');



const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, index: true, require: true },
    password: String,
  
});



const UserModel = mongoose.model('UserModel', userSchema);



module.exports = UserModel;

