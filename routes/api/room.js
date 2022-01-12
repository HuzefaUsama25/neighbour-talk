const express = require('express')

const router = express.Router()

router.get("/rooms", (req, res) => {
    res.status(200).json({ name: 'room1', coords: '68x28' })
})

router.get("/rooms/id=:id/messages", (req, res) => {
    res.status(200).send(`Messages for: ${req.params.id}`)
})


module.exports = router