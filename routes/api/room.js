const express = require('express')
const router = express.Router()

const Room = require('../../models/Room')

router.get("/rooms", (req, res) => {
    Room.find()
        .then(rooms => res.status(200).json(rooms))
        .catch(err => res.status(404).send("No Recipie Found"))
})


module.exports = router