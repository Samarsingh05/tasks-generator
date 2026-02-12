const express = require('express')
const fs = require('fs')
const path = require('path')
const generateSpec = require('../utils/generator')

const router = express.Router()
const dataDir = path.join(__dirname, '../data')
const dataPath = path.join(dataDir, 'specs.json')

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

function readData() {
  try {
    if (!fs.existsSync(dataPath)) {
      return []
    }
    const data = fs.readFileSync(dataPath, 'utf8')
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading data:', error)
    return []
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing data:', error)
    throw error
  }
}

router.post('/generate', (req, res) => {
  try {
    const { goal, users, constraints, template, risks } = req.body

    if (!goal || !users) {
      return res.status(400).json({ error: 'Goal and users are required' })
    }

    const spec = generateSpec({ goal, users, constraints, template, risks })

    const all = readData()
    const newSpec = { 
      id: Date.now(), 
      createdAt: new Date().toISOString(),
      goal, 
      users, 
      constraints, 
      template, 
      risks, 
      ...spec 
    }

    all.unshift(newSpec)
    const lastFive = all.slice(0, 5)

    writeData(lastFive)

    res.json(newSpec)
  } catch (error) {
    console.error('Error generating spec:', error)
    res.status(500).json({ error: 'Failed to generate specification' })
  }
})

router.get('/history', (req, res) => {
  try {
    const data = readData()
    res.json(data.slice(0, 5))
  } catch (error) {
    console.error('Error fetching history:', error)
    res.status(500).json({ error: 'Failed to fetch history' })
  }
})

module.exports = router
