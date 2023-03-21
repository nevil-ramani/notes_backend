const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');



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


const login = async (req, res) => {
    
    const {email, password} = req.body;

    const user = await UserModel.findOne({email});

    if (!user) return res.status(401);

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return res.status(401);


    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    var token = jwt.sign({ sub: user._id , exp: exp }, process.env.SECRET);

    res.json({token: token});

    res.cookie('authorization', token ,{
        expires: new Date(exp),
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });
}

//logout


module.exports = {
    signup:signup,
    login:login
}