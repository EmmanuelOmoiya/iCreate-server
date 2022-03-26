const jwt =  require('jsonwebtoken');
const User = require("../models/userModel.js");
const asyncHandler = require('express-async-handler');
const JWT_SECRET =  require('../config/db').JWT_SECRET

const protect = asyncHandler(async (req, res, next) => {
    let token;
    console.log(req.headers.authorization);

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, JWT_SECRET);

            req.user = await User.findById(decoded.id).select("password");

            next();
        } catch (error) {
          res.status(401);
          throw new Error("Not authorized, token failed");
        }
    }

    if(!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = { protect };