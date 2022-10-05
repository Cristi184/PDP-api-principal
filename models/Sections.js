import mongoose from 'mongoose';

const SectionsSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true
    },
    sectionName: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: [String],
    },
    content: {
        type: [String],
    },
    video: {
        type: [String],
    },
    links: {
        type: [String],
    },
    img: {
        type: [String],
    },
});

export default mongoose.model("Section", SectionsSchema)