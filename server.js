const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config/db')
const app = express()

const router = require('./routes/api/room')
const apiPort = 8082

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use('/api', router)

connectDB()

app.get('/', (req, res) => {
    res.send('go to /api route to interact with the database')
})


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
