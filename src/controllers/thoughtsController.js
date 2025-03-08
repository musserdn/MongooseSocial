import { Thoughts, User } from '../models/index.js';

export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thoughts.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getSingleThought = async (req, res) => {
    try {
        const thought = await Thoughts.findOne({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const createThought = async (req, res) => {
    try {
        const thought = await Thoughts.create(req.body);
        
        if (req.body.userId) {
            await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true, runValidators: true }
            );
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const updateThought = async (req, res) => {
    try {
        const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteThought = async (req, res) => {
    try {
        const thought = await Thoughts.findOneAndDelete(
            { _id: req.params.thoughtId }
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
        } else {
            res.json({ message: 'Thought successfully deleted' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const addReaction = async (req, res) => {
    try {
        // Push a new reaction into the existing Thought’s reactions array
        const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteReaction = async (req, res) => {
    try {
        // Pull the reaction from the Thought’s reactions array by reactionId
        const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};