const mongoose = require('mongoose');


const courseSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    image_link: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    course_topic: {
        type: String,
        required: true,
    },

    course_language: {
        type: String,
        required: true,
    },

    instructor_name: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    ratings: {
        type: String,
        required: true
    },

    already_enrolled: {
        type: String,
        required: true
    },




}, { timestamps: true })



module.exports = mongoose.model('CourseModel', courseSchema)

