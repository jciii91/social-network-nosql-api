const { Thought, User } = require('../models');

const thoughtController = {
    // create thought
    createThought({ body }, res) {
        User.findOne({ _id: body.userId })
            .select('-__v')
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                } else if (dbUserData.username != body.username) {
                    res.status(404).json({ message: 'Incorrect username used.' });
                    return;
                }
                Thought.create(body)
                    .then(dbThoughtData => {
                        User.findByIdAndUpdate({ 
                            _id: dbThoughtData.userId }, 
                            {$push: {thoughts: dbThoughtData._id}}, 
                            {new: true, runValidators: true 
                        })
                        .then(dbUserData => res.json(dbUserData))
                        .catch(err => res.json(err));
                    })
            })
            .catch(err => res.json(err));
    },
}

module.exports = thoughtController;