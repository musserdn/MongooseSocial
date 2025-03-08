import { Schema, model } from 'mongoose';
import reactionSchema from './Reaction.js';

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
    },
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtSchema);
export default Thoughts;