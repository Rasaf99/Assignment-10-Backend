const express = require('express')

const { fetchCourses, searchCourse, createCourse, deleteCourse, updateCourse } = require('../controllers/course-controller')


const router = express.Router()


// Get all courses
router.route('/').get(fetchCourses)


// Get a specific course
router.route('/:id').get(searchCourse)


// Post a new course
router.route('/').post(createCourse)


// Delete a specific course
router.route('/:id').delete(deleteCourse)


// Update a specific course
router.route('/:id').patch(updateCourse)


module.exports = router