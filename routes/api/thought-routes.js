const router = require('express').Router();

const {
    createThought
} = require('../../controllers/thought-controller');

// /api/users
router 
    .route('/')
    .post(createThought);

module.exports = router;