const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');


//signup

const signup = async (req, res) => {
    const {email, password} = req.body;
    
    // const saltRounds = 10;
    // const salt = bcrypt.genSaltSync(saltRounds);

    const hashPassword = bcrypt.hashSync(password, 8);
    
    
    // const hashpassword = bcrypt.hashSync(password, 8);


    const signup = await UserModel.create({
        email: email,
        password: hashPassword
    })

    //respond with the new note
    res.send(signup);
}


//login


//logout


module.exports = {
    signup:signup
}