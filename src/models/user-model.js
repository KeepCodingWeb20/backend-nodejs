import mongoose, { Schema } from 'mongoose';

// name, email, password

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        }
    }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);