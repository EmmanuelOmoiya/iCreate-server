const mongoose = require('mongoose');

const projectModel = mongoose.Schema({
    projectName: { type: String, required: true },
    description: { type: String,  required: true},
    industry: { type: String, required: true },
    hashTag: { type: String, required: true, unique: true },
    authorName: {type: String,},
    authorImg: {type: String, },
    img: { type: String, },
    likes: { type: Number, default: 0 },
    doc: { type: Number, default: 0 },
    share: { type: Number, default: 0 },
    comments: [
        {type: String},
        {timestamps: true}
    ],
    id : { type: String },
},
{
    timestamps: true
}
);

const Project = mongoose.model("Project", projectModel);

module.exports = Project;