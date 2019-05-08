import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import moment from 'moment';

import Project from '../models/project';

const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

router.get('/', (req, res, next) => {
    Project.find().lean().exec(function (err, projects) {
        console.log('getting projects', projects);
        return res.status(200).json(projects);
    });
});

router.post('/', (req, res, next) => {
    // console.log("req.body.images", req.body.images);

    const project = new Project({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        body: req.body.body,
        excerpt: `${req.body.body.split(' ').splice(0, 15).join(' ')}...`,
        created: {
            original: new Date(Date.now()).toISOString(),
            formatted: moment(new Date(Date.now()).toISOString()).format('DD-MM-YY')
        },
        images: req.body.images.sort((a, b) => a.position < b.position ? 1 : -1).map(image => {
            image.data = Buffer.from(image.data, 'base64');
            return image;
        })
    });

    // console.log('POSTED PROJECT', project);

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
    Project.findById(req.params.projectId, (error, doc) => {
        doc.title = req.body.title || doc.title;

        if (req.body.body !== doc.body) {
            doc.excerpt = `${req.body.body.split(' ').splice(0, 15).join(' ')}...`;
        }

        doc.body = req.body.body || doc.body;
        doc.images = req.body.images.map(image => {
            image.data = Buffer.from(image.data, 'base64');
            return image;
        });

        doc.save((err, docs) => {
           if (error) {
               res.status(500).json({ error: err });
           } else {
               res.status(200).json({});
           }

           return next();
        });
    });
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