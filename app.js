require('express-async-errors')
require('dotenv').config()
const express = require('express')
const app = express()
const authenticateUser = require('./middleware/authentication')
//error handler
const notFound = require('./middleware/not_found')
const errorHandler = require('./middleware/error_handler')

const port = process.env.PORT || 3000
const connectDB = require('./database/connection')

app.use(express.json())

//routes
const authRoutes = require('./routes/auth')
const jobsRoutes = require('./routes/jobs')

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', authenticateUser, jobsRoutes)

app.use(notFound)
app.use(errorHandler)

//starter function
const start = async ()=>{
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port,console.log(`Server is live on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()