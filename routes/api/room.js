const express = require('express')
const router = express.Router()

const Room = require('../../models/Room')


// get all rooms
router.get("/rooms", (req, res) => {
    Room.find()
        .then(rooms => res.status(200).json(rooms))
        .catch(err => res.status(404).send("No Recipie Found"))
})

// get a specific room
router.get("/rooms&coords=:coords", (req, res) => {
    Room.find({ "coords": req.params.coords })
        .then(rooms => res.status(200).json(rooms))
        .catch(err => res.status(404).send("No Recipie Found"))
})

// post a message to room, make a new room if doesn't already exist
router.post("/rooms&coords=:coords", (req, res) => {
    Room.findOneAndUpdate({ "coords": req.params.coords }, { $push: { messages: { name: req.body.name, message: req.body.message, messageDateCreated: Date.now() } } })
        .then(rooms => {
            if (rooms == null) {
                Room.create({ "coords": req.params.coords, "messages": { name: req.body.name, message: req.body.message, messageDateCreated: Date.now() } })
                    .then((req, res) => {
                        res.status(200).json({ success: "Created new room and added message" })
                    })
            }
            else {
                res.status(200).json({ success: "added message to old room" })
            }

        })
        .catch(err => res.status(404).json({ error: `${err}` }))
})



module.exports = router