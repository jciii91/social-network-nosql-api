const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    addFriend,
    deleteUser
} = require('../../controllers/user-controller');

// /api/users
router 
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/<id>/friends
router
    .route('/:id/friends')
    .put(addFriend);

module.exports = router;