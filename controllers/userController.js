const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

const registerUser = asyncHandler(async (req, res) =>{
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const farmName = req.body.farmName;

    const userExists = await User.findOne({email});
    

    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        fullName,
        email,
        password,
        role,
        farmName
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            img: user.img,
            role: user.role,
            farmName: user.farmName,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error("Failed to create the user");
    }
});

const authUser = (async(req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          password: user.password,
          role: user.role,
            farmName: user.farmName,
          img: user.img,
          token: generateToken(user._id),
    })
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

const updateUsers = asyncHandler(async(req, res) =>{

});

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search 
    ?   {
            $or: [
                { fullName: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ]
        }
    :   {};

    const users = await User.find(keyword).find({_id:{$ne:req.user._id}});
    res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
