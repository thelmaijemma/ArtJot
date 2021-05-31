const mongoose = require('mongoose')

const JotSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['public', 'private']
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Jot', JotSchema)