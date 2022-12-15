// importing libraries
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const morgan = require('morgan')
const cors = require('cors')
const { StatusCodes } = require('http-status-codes')


// importing from this project
const AppError = require('./utlis/app-error');
const globalErrorHandler = require('./middleware/global-error-handler-middleware');

const courseRoute = require('./routes/course-route')


// dotenv
dotenv.config()

// express
const app = express()

// console.log the requests along with some other information quick debugging
app.use(morgan('tiny'))


// CORS (Cross-origin resource sharing allows AJAX requests to skip the Same-origin policy and access resources from remote hosts)
app.use(cors())


// middleware
app.use(express.json())


// routes
app.use('/api/v1/course', courseRoute)


// route not found 
app.all('*', (req, res, next) => {

    next(new AppError(`This '${req.originalUrl}' route doesn't exist on the server.`, StatusCodes.NOT_FOUND))

})



// global error handling middleware (This middleware must be placed after all the middlewares)
app.use(globalErrorHandler)


// connect db and start server
const connect_db_and_start_server = async () => {

    try {
        // connecting mongoDB
        await mongoose.connect(process.env.MONGODB_URI)

        /* after the mongoDB is connected, we want to start to listen for requests */
        app.listen(process.env.PORT || 4000, () => {

            console.log(`MongoDB is connected & server is listening on port: ${process.env.PORT || 4000}`)

        })
    }

    catch (error) {

        console.log(error)

        process.exit(1)
    }
}


connect_db_and_start_server()