const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userModel = mongoose.Schema({
    fullName: { type: String, required: true},
    email: { type: String, unique: true , required: true},
    password: { type: String, required: true},
    farmName: { type: String, required: true},
    address: { type: String },
    phoneNumber: { type: String },
    role: {
        type: String
    },
    img: {
        type: String,
        default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
},
{
    timestamps: true
}
);

userModel.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}
  
userModel.pre('save', async function(next){
    if(!this.isModified){
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userModel);

module.exports = User;
