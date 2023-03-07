const User = require('../models/User')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

// Generate user token
const generateToken = (id) => {
  return jwt.sign({id: id}, jwtSecret, {
    expiresIn: 36000,
  })
}

// Register user and sign in
const register = async (req, res) => {
  
  const { name, email, password } = req.body

  // Check if user already exists
  const user = await User.findOne({ email })

  if(user) {
    res.status(422).json({
      errors: ["Email já cadastrado"],
    })
    return
  }

  try {
    // Generate password hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    // Create User
    const newUser = await User.create({
      name,
      email,
      password: passwordHash
    })

    // If user was created succefully, return token
    res.status(201).json({
      _id: newUser._id,
      token: generateToken(newUser._id)
    })
    return 
  } catch (error) {
    res.status(422).json({
      errors: ['Houve algum problema, tente mais tarde']
    })  
    return
  }

}

module.exports = {
  register,
}