const { StatusCodes } = require('http-status-codes')

const CourseModel = require('../models/course-model.js')

const AppError = require('../utlis/app-error.js')
const tryCatchAsync = require('../utlis/try-catch-async.js')




/* 

Description:  Fetch all the  courses 

Method: GET

Route: /api/v1/course

Access: Public

*/

const fetchCourses = tryCatchAsync(async (req, res, next) => {

        let queriedCourses = CourseModel.find({}).sort({ createdAt: -1 })


        // pagination & limit
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 100
        const skip = (page - 1) * limit


        queriedCourses = queriedCourses.skip(skip).limit(limit)



        // if everything is ok
        const courses = await queriedCourses

        res.status(StatusCodes.OK).json(courses)

})




/* 

Description:  Search a specific course 

Method: GET

Route: /api/v1/courses/:id

Access: Public
*/


const searchCourse = tryCatchAsync(async (req, res, next) => {


        const { id } = req.params

        // checking whether any course exits with that id or not
        const course = await CourseModel.findOne({ _id: id })


        if (!course) {

                return next(new AppError('No course exits with that id', StatusCodes.NOT_FOUND))
        }


        res.status(StatusCodes.OK).json(course)
})





/* 

Description:  Create a Course 

Method: POST

Route: /api/v1/course

Access: Private


*/

const createCourse = tryCatchAsync(async (req, res, next) => {


        const newCourse = new CourseModel(req.body);
        await newCourse.save();

        res.status(StatusCodes.CREATED).json(newCourse)
})





/* 

Description:  Delete a specific course 

Method: DELETE

Route: /api/v1/course/:id

Access: Private

*/


const deleteCourse = tryCatchAsync(async (req, res, next) => {


        const { id } = req.params

        // trying to find the course 
        const existsOrNot = await CourseModel.findOne({ _id: id })


        if (!existsOrNot) {

                return next(new AppError('There is no course with that id.', StatusCodes.NOT_FOUND))

        }

        const course = await CourseModel.findOneAndDelete({ _id: id })


        res.status(StatusCodes.OK).json(course)

})




/* 

Description:  Update a specific course 

Method: PATCH

Route: /api/v1/course/:id

Access: Private

*/

const updateCourse = tryCatchAsync(async (req, res, next) => {

        const { id } = req.params

        // trying to find the course 
        const existsOrNot = await CourseModel.findOne({ _id: id })


        if (!existsOrNot) {

                return next(new AppError('There is no course with that id.', StatusCodes.NOT_FOUND))
        }


        const course = await CourseModel.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true })


        res.status(StatusCodes.OK).json(course)

})



module.exports = { fetchCourses, searchCourse, createCourse, deleteCourse, updateCourse }