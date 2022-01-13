const mongoose = require('mongoose')


roomSchema = new mongoose.Schema(
    {
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
                }
            },
        ]
    }
)


module.exports = Room = mongoose.model('Room', roomSchema)