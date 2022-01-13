const mongoose = require('mongoose')




roomSchema = new mongoose.Schema(
    {
        createdAt: { type: Date, expires: '1s', default: Date.now() },
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
                    default: Date.now()
                }
            },
        ]
    }
)



module.exports = Room = mongoose.model('Room', roomSchema)