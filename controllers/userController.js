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

    

    // res.cookie('authorization', token ,{
    //     expires: new Date(exp),
    //     httpOnly: true,
    //     sameSite: "lax",
    //     secure: process.env.NODE_ENV === "production",
    // });

    // res.cookie( "key", token,{ maxAge: 1000 * 60 * 10, httpOnly: false });

    res.cookie('Authorization', token, {
        expires  : new Date(Date.now() + 9999999),
        httpOnly : false
      });
      
      res.status(200).send({ token: token });   //server would hang without this line of code


}



//logout



// check Authantication

const checkAuth = (req, res) => {
    console.log(req.user)
}


module.exports = {
    signup:signup,
    login:login,
    checkAuth:checkAuth
}