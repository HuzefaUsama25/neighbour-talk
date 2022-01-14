const mongoose = require('mongoose')




roomSchema = new mongoose.Schema(
    {
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
            expires: 3600
        },
        coords: {
            type: String,
            required: true
        },
        messages: [
            {
                name: {
                    type: String,
                    required: true
                },
                message: {
                    type: String,
                    required: true
                },
                messageDateCreated: {
                    type: Date,
                    required: true,
                    default: Date.now
                }
            },
        ]
    }
)

//roomSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 })

module.exports = Room = mongoose.model('Room', roomSchema)