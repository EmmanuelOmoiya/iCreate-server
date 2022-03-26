const express = require('express');
const router = express.Router();
const Project = require('../models/projectModel');

router.post('/',(req, res)=>{
    const newProject = new Project({
        projectName : req.body.projectName,
        description : req.body.description,
        industry : req.body.industry,
        hashTag : req.body.hashTag,
        authorName: req.body.authorImg,
        authorImg: req.body.authorImg,
    });

    newProject.save()
        .then(data =>{
           res.json(data)
        })
        .catch(error=>{
        res.json(error)
        })
});

router.get('/', (req, res) =>{
    Project.find()
        .then(foundProjects => res.json(foundProjects))
});

router.route('/:name').get((req,res)=>{
    const name = req.params.name;
    Project.find({ fullName : name})
        .then(foundProjectId => res.json(foundProjectId))
});

module.exports = router;