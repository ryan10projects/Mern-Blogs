const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogschema  = new Schema({
    title: { 
        type: String,
        required: true
    },
    content: {
        type:String,
        required: true
    },
    tags:{
        type: String,
        required: true
    }
}, { timestamps: true })

//blogs collection
module.exports = mongoose.model('Blogs', blogschema)

