const router = require('express').Router();

const {
    createThought,
    getAllThoughts,
    getThoughtById
} = require('../../controllers/thought-controller');

// /api/thoughts
router 
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/:id
router 
    .route('/:id')
    .get(getThoughtById);

module.exports = router;