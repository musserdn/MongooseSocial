import { Schema, model } from 'mongoose';
import validator from 'validator';

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid e-mail address'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, {

    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);
export default User;