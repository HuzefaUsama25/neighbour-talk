const express = require('express')
const router = express.Router()

const Room = require('../../models/Room')


// get all rooms
router.get("/rooms", (req, res) => {
    Room.find()
        .then(rooms => res.status(200).json(rooms))
        .catch(err => res.status(404).send("No Recipie Found"))
})



// get a messages for a room, make a new room if it doesn't already exist
router.get("/rooms&coords=:coords", (req, res) => {
    Room.findOne({ "coords": req.params.coords })
        .then(rooms => {
            // if there is no room matching the coords, then create new room
            if (rooms == null) {
                Room.create({ "coords": req.params.coords, "messages": [] })
                    .then(rooms => {
                        res.status(200).json(rooms)
                    })
                    .catch(err => {
                        res.status(404).send(`unable to create new room ${err}`)
                    })
            }
            // if there is a room than show it latest 10 messages
            else {
                res.status(200).json(rooms.messages.slice(rooms.messages.length - 10))
            }
        })
        .catch(err => res.status(404).send(`${err}`))
})



// post a message to room
router.post("/rooms&coords=:coords", (req, res) => {
    Room.findOneAndUpdate({ "coords": req.params.coords }, { $push: { messages: { name: req.body.name, message: req.body.message, messageDateCreated: Date.now() } } })
        .then(rooms => {
            res.status(200).send("added message to room")
        })
        .catch(err => res.status(404).send(`Final error: ${err}`))
})



module.exports = router