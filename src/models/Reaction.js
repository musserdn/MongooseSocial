import { Schema, Types } from 'mongoose';
import { formatTimestamp } from '../utils/date.js';

const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatTimestamp,
    },
}, {
    timestamps: true,
    _id: false,
    toJSON: {
        virtuals: true,
        getters: true,
    },
});

export default reactionSchema;