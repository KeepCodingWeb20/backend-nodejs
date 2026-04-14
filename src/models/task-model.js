import mongoose, { Schema } from 'mongoose';

// Schema (molde o plantilla)
const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        done: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);


// Model (contenedor o generador)
export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);