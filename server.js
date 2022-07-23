require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const routes = require('./routes/blogs')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/', routes)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'))
}

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    // listen for requests
    app.listen(process.env.PORT || 4000, () => {
    console.log('connected to port db and listening on port', process.env.PORT)
        })
    })
    .catch((e) => {console.log(e)})


