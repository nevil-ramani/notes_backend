
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () =>  {

try{
     await mongoose.connect(process.env.CONNECTION_STRING);
     console.log("database connected successfully...")

} catch (err) {
 console.log(err);
}
}

// if(connectDB){
//     console.log("database connected successfully...")
// }

module.exports = connectDB;
