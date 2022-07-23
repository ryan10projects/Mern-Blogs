const express = require('express')
const Blog = require('../models/modelSchema')
const router = express.Router()
const { create, getall, getSingleDoc, deleteDoc, updateDocument } = require('../controllers/controller')

// GET all workouts
router.get('/', getall)

// GET a single workout
router.get('/:id', getSingleDoc)

// POST a new workout
router.post('/',create)

// DELETE a workout
router.delete('/:id', deleteDoc)

// UPDATE a workout
router.patch('/:id',updateDocument)

module.exports = router