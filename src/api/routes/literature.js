import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

export default router;