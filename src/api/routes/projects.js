import express from 'express';
import mongoose from 'mongoose';

import Project from '../models/project';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling GET requests to /projects'
    });
});

router.post('/', (req, res, next) => {
    console.log('title', req.body, req.body.title);
    const project = new Project({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        body: req.body.body,
        images: req.files
    });

    project
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'handling POST requests to /projects',
                project: project
            });
        })
        .catch(err => {
            console.log('err', err);
            res.status(500).json({ error: err });
        })
});

router.get('/:projectId', (req, res, next) => {
    Project.findById(req.params.projectId)
        .exec()
        .then(doc => {
            console.log('doc', doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log('err', err);
            res.status(500).json({ error: err });
        });
});

router.patch('/:projectId', (req, res, next) => {
    const id = req.params.projectId;

    res.status(200).json({
        message: 'handling PATCH requests to /projects/:projectId',
        id
    })
});

router.delete('/:projectId', (req, res, next) => {
    const id = req.params.projectId;

    res.status(200).json({
        message: 'handling DELETE requests to /projects/:projectId',
        id
    })
});

export default router;