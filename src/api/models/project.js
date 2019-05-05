import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    body: String,
    images: [{ url: String, text: String }]
});

export default mongoose.model('Project', projectSchema);