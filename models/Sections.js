import mongoose from 'mongoose';

const SectionsSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true
    },
    sectionName: {
        type: String,
        required: false,
    },
    title: {
        type: String,
    },
    subTitle: {
        type: [String],
    },
    content: {
        type: [],
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