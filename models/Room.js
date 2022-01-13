const mongoose = require('mongoose')


roomSchema = new mongoose.Schema(
    {
        coords: {
            type: String,
            required: true
        },
        roomDateCreated: {
            type: Date,
            required: true,
            default: Date.now()
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
                    default: Date.now()
                }
            },
        ]
    }
)


module.exports = Room = mongoose.model('Room', roomSchema)