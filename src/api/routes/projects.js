import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import Project from '../models/project';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', (req, res, next) => {
    Project.find().lean().exec(function (err, projects) {
        return res.status(200).json(projects);
    })
});

router.post('/', upload.array('images', 4), (req, res, next) => {
    const project = new Project({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        body: req.body.body,
        created: Date.now(),
        images: req.files.map(file => ({
            contentType: file.mimetype,
            data: new Buffer(file.buffer.toString('base64'), 'base64')
        }))
    });

    project
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({});
        })
        .catch(err => {
            console.log('err', err);
            res.status(500).json({ error: err });
        })
});

router.get('/:projectId', (req, res, next) => {
    console.log('req.params.projectId', req.params.projectId);

    Project.findById(req.params.projectId)
        .lean()
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