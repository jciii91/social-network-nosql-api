const router = require('express').Router();

const {
    createThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    addReaction,
    deleteThought
} = require('../../controllers/thought-controller');

// /api/thoughts
router 
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/:id
router 
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/<thought>/reactions
router
    .route('/:thoughtId/reactions')
    .put(addReaction);

module.exports = router;