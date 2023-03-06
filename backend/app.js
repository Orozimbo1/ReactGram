require('dotenv').config()

const express = require('express')
const path = require('path')
const cors = require('cors')

const port = process.env.PORT

const app = express()

// config JSON and form data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
const router = require('./routes/Router')

// Solve CORS
app.use(cors({ credentials: true, origin: '*' }))

// Upload directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// DB connection
require('./config/db.js')

app.use(router)

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
  console.log(`http://localhost:+ ${port}`)
})