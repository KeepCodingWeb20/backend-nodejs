import mongoose, { Schema } from 'mongoose';
import { hash, compare } from 'bcrypt';

import { MODELS } from './models.js';

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
            type: String, // Guardar encriptado
            select: false,
        }
    },
    {
        timestamps: true,
    }
);

// HASH
// a -> xzy | xzy

// -------
// Métodos custom
// -------

// A: hash
// Método de clase
// function hashPassword(clearPassword) {
//     return hash(clearPassword, 7);
// }
userSchema.statics.hashPassword = (clearPassword) => {
    return hash(clearPassword, 7);
}

// B: compare
// Metodo de instancia
// Necesito acceder a la propia instancia para conocer su hash
// dentro de "this" tenemos toda la instancia
// function comparePassword(plainPassword) {
//     return compare(plainPassword, hash);
// }
userSchema.methods.comparePassword = function(plainPassword) {
    return compare(plainPassword, this.password);
}


export const User = mongoose.models.User || mongoose.model(MODELS.USER, userSchema);