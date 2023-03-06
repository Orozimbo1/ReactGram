require('dotenv').config()

const express = require('express')
const path = require('path')
const cors = require('cors')

const port = process.env.PORT

const app = express()

// config JSON and form data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
  console.log(`http://localhost:+ ${port}`)
})