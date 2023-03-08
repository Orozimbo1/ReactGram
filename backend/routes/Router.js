const express = require('express')
const router = express.Router()

router.use('/api/users', require('./userRoutes'))
router.use('/api/photos', require('./photoRoutes'))

// test route
router.get('/', (req, res) => {
  res.send('Olá mundo!')
})

module.exports = router