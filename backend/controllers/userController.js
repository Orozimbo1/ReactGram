const User = require('../models/User')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

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

// Sign user in
const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  // Check if user exists
  if(!user) {
    res.status(404).json({
      errors: ['Usuário ou senha incorretos.']
    })
    return
  }

  // Check if password matches
  if(!(bcrypt.compare(password, user.password))) {
    res.status(404).json({
      errors: ['Usuário ou senha incorretos.']
    })
    return
  }

  // Return user with token
  res.status(200).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id)
  })
  return 
}

// Get current logged in user
const getCurrentUser = async (req, res) => {
  const user = req.user

  res.status(200).json(user)
}

// Update an user
const update = async (req, res) => {
  
  const { name, password, bio } = req.body

  let profileImage = null

  if(req.file) {
    profileImage = req.file.filename
  }

  const reqUser = req.user

  const user = await User.findById(reqUser._id).select('-password')

  if(name) {
    user.name = name
  }

  if(password) {
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    user.password = passwordHash
  }

  if(profileImage) {
    user.profileImage = profileImage
  }

  if(bio) {
    user.bio = bio
  }

  await user.save()

  res.status(200).json(user)

}

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
}