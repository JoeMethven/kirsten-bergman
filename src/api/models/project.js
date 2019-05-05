import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    body: String,
    created: Date,
    images: [{ contentType: String, data: Buffer }]
});

export default mongoose.model('Project', projectSchema);