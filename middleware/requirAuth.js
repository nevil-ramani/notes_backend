const jwt = require('jsonwebtoken');

const UserModel = require('../model/userModel');


const requireAuth = async (req , res , next) => {
    //get cookies
    const  token = req.cookies.Authorization;

    //decode cookie
    const decoded = jwt.verify(token, process.env.SECRATE);

    //find user using decoded sub
    const user = await UserModel.findById(decoded.sub);

    //attach user to req
    req.user = user;

    // continue on
    next();

}

module.exports = requireAuth;