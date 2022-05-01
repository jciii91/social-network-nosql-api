const router = require('express').Router();

const {
    createThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    addReaction,
    deleteThought,
    removeReaction
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

// /api/thoughts/<thoughtId>/reactions
router
    .route('/:thoughtId/reactions')
    .put(addReaction);

// /api/thoughts/<thoughtId>/reactions/<reactionId>
router
    .route('/:thoughtId/reactions/:reactionId')
    .put(removeReaction);

module.exports = router;