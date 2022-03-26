const jwt = require('jsonwebtoken');
const secret = require('../config/db').JWT_SECRET

const generateToken = (id) =>{
    return jwt.sign({id}, secret,{
        expiresIn: "30d",
    });
};
 
module.exports = generateToken;