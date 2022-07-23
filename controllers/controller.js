const Blogs = require('../models/modelSchema')
const mongoose = require('mongoose')
//get all documents
const getall =  async(req,res)=>{
    const allDoc = await Blogs.find({}).sort({createdAt: -1})
    res.status(200).json(allDoc)
  
}


//get a single document
const getSingleDoc = async(req,res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such Blogs'})
    }
    const getDoc = await Blogs.findById(id)

    if(!getDoc){
        return res.status(404).json({error: 'No such document'})
    }

    res.status(200).json(getDoc)
}

//create new document
const create = async (req,res)=>{
    const { title, tags, content } = req.body

    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!tags){
        emptyFields.push('tags')
    }
    if(!content){
        emptyFields.push('content')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Missing fields: '+emptyFields.join(', ')})
    }
    
    try {
      const blogs = await Blogs.create({title, tags, content})
      res.status(200).json(blogs)
    }catch(error){
      res.status(400).json({error: error.message})
    }

}


// delete a document
const deleteDoc = async(req,res)=>{
    const { id } = req.params
    //same size id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such Blogs'})
    }

    const deleteDocument = await Blogs.findOneAndDelete({_id: id})
    if(!deleteDocument){
        return res.status(404).json({error: 'No such document'})
    }

    res.status(200).json(deleteDocument)

}

// update document
const updateDocument = async (req, res)=>{
    const { id } = req.params
    //same size id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such Blogs'})
    }

    const updateDoc = await Blogs.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!updateDoc){
        return res.status(404).json({error: 'No such document'})
    }

    res.status(200).json(updateDoc)
}

module.exports = {
    create,
    getall,
    getSingleDoc,
    deleteDoc,
    updateDocument
}