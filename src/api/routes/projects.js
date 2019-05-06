import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import moment from 'moment';

import Project from '../models/project';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', (req, res, next) => {
    Project.find().lean().exec(function (err, projects) {
        return res.status(200).json(projects);
    });
});

router.post('/', upload.array('images', 4), (req, res, next) => {
    const project = new Project({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        body: req.body.body,
        excerpt: `${req.body.body.split(' ').splice(0, 15).join(' ')}...`,
        created: {
            original: new Date(Date.now()).toISOString(),
            formatted: moment(new Date(Date.now()).toISOString()).format('DD-MM-YY')
        },
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
        .then(project => {
            res.status(200).json(project);
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

router.delete('/delete/:projectId', (req, res, next) => {
    const id = req.params.projectId;

    Project.remove({ _id: id }, (err) => {
        if (!err) {
            res.status(200).json({});
        } else {
            res.status(500).json({ error: err });
        }
    })
});

export default router;