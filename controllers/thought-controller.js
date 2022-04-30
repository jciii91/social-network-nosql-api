const { Thought, User } = require('../models');

const thoughtController = {
        // get all thoughts
        getAllThoughts(req, res) {
            Thought.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
        },
    
        // get on user by id
        getThoughtById({ params }, res) {
            Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
        },

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

    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
}

module.exports = thoughtController;