const mongoose = require('mongoose');
const encryption = require('../../utils/encryption');

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
},
{
    timestamps: true

});

schema.set('toJSON', {
    virtuals: true
});

schema.set('toObject', {
    virtuals: true
});

schema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = encryption.hashPasswordusingbcryptjs(this.password);
    }
    next();
});

module.exports = mongoose.model('users', schema);