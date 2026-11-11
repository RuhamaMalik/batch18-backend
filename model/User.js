import mongoose from "mongoose";
import bcrypt from "bcryptjs";

let userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    contact: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'block'],
        default: 'active'
    }
}, { timestamp: true });

//////////// password hash

userSchema.pre("save", async (next) => {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 12);
});

//////////// password compare

userSchema.method.comparePswd = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;

// comparePswd('ruhama12345')