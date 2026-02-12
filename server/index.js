const express = require('express')
const cors = require('cors')
require('dotenv').config()

const specsRoute = require('./routes/specs')

const app = express()

app.use(cors({
  origin: ["http://localhost:5173", "https://samarsingh05.github.io"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}))

app.use(express.json())

app.options('/api/specs/generate', cors())

app.use('/api/specs', specsRoute)

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
