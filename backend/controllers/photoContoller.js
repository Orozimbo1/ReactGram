const Photo = require('../models/Photo')
const User = require('../models/User')

const mongoose = require('mongoose')

// Insert a photo, with an user related to it
const insertPhoto = async (req, res) => {

  const { title } = req.body
  const image = req.file.filename

  const reqUser = req.user

  const user = await User.findById(reqUser._id)

  // Create a photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name
  })

  // If photo was created successfully, return data
  if(!newPhoto) {
    res.status(422).json({
      errors: ['Ocooreu um erro ao tentar salvar a imagem, tente mais tarde.']
    })
    return
  }

  res.status(201).json(newPhoto)
}

// Remove a photo from DB
const deletePhoto = async (req, res) => {
  const { id } = req.params

  const reqUser = req.user

  try {
    const photo = await Photo.findById(id)

    // Check if photo exists
    if(!photo) {
      res.status(404).json({
        errors: ['Foto não encontrada.']
      })
      return
    }

    // Check if photo belong to user
    if(!photo.userId.equals(reqUser._id)){
      res.status(422).json({
        errors: ['Houve um erro ao tentar deletar a foto, por favor tente mais tarde.']
      })
      return
    }

    await Photo.findByIdAndDelete(photo._id)

    res.status(200).json({ 
      id: photo._id,
      message: 'Foto deletada com sucesso.'
    })

  } catch (error) {
    res.status(404).json({
      errors: ['Foto não encontrada.']
    })
    return
  }
}

// Get all photos
const getAllPhotos = async (req, res) => {

  const photos = await Photo.find({}).sort([['createdAt', -1]]).exec()

  return res.status(200).json(photos)

}

// Get user photo
const getUserPhotos = async (req, res) => {

  const { id } = req.params

  const photos = await Photo.find({ userId: id }).sort([[ 'createdAt', -1 ]]).exec()

  return res.status(200).json(photos)

}

// Get Photo by Id
const getPhotoById = async (req, res) => {

  const { id } = req.params

  try {

    const photo = await Photo.findById(id)

    // Check if photo exists
    if(!photo) {
      res.status(404).json({
        errors: ['Foto não encontrada.']
      })
      return
    }

    res.status(200).json(photo)

  } catch (error) {
    res.status(404).json({
      errors: ['Foto não encontrada.']
    })
    return
  }

}

// Update photo
const updatePhoto = async (req, res) => {

  const { id } = req.params
  const { title } = req.body

  const reqUser = req.user

  try {

    const photo = await Photo.findById(id)

    // Check if photo exists
    if(!photo) {
      res.status(404).json({
        errors: ['Foto não encontrada.']
      })
      return
    }

    // Check if photo belong to user
    if(!photo.userId.equals(reqUser._id)) {
      res.status(412).json({
        errors: ['Ocorreu um erro, por favor tente mais tarde.']
      })
      return
    }

    if(title) {
      photo.title = title
    }

    await photo.save()

    res.status(200).json({
      photo, message: 'Foto atualizada com sucesso.'
    })
  } catch (error) {
    res.status(404).json({
        errors: ['Foto não encontrada.']
      })
    return
  }

}

// Like functionality
const likePhoto = async (req, res) => {

  const { id } = req.params
  
  const reqUser = req.user
  
  try {
    
    const photo = await Photo.findById(id)

    // Check if photo exists
    if(!photo) {
      res.status(404).json({
        errors: ['Foto não encontrada.']
      })
      return
    }

    // Check if user already liked the photo
    if(photo.likes.includes(reqUser._id)) {
      res.status(422).json({
        errors: ['Você já curtiu a foto.']
      })
      return
    }

    // Put user id in the likes array
    photo.likes.push(reqUser._id)

    await photo.save()

    res.status(200).json({
      photoId: id, userId: reqUser._id, message: 'Você curtiu a foto.'
    })

  } catch (error) {
    
  }

}

// Comment functionality
const commentPhoto = async (req, res) => {

  const { id } = req.params

  const { comment } = req.body

  const reqUser = req.user

  try {
    
    const user = await User.findById(reqUser._id)

    // Check if user exists
    if(!user) {
      res.status(404).json({
        errors: ['Usuário não encontrado.']
      })
      return
    }

    const photo = await Photo.findById(id)

    // Check if photo exists
    if(!photo) {
      res.status(404).json({
        errors: ['Foto não encontrada.']
      })
      return
    }

    // Put comment in the array comments
    const commentUser = {
      comment,
      userName: user.name,
      userImage: user.profileImage,
      userId: user._id
    }

    photo.comments.push(commentUser)

    await photo.save()

    res.status(200).json({
      comment: commentUser,
      message: 'O comentário foi inserido com sucesso.'
    })

  } catch (error) {
    res.status(401).json({
      errors: ['Houve um erro, por favor tente mais tarde.']
    })
  }

}

// Search photo by title
const searchPhotos = async (req, res) => {

  const { q } = req.query

  try {
    
    const photos = await Photo.find({ title: new RegExp(q, 'i') }).exec()

    if(photos.length === 0) {
      res.status(404).json({
        errors: [`Não foi encontrada nenhuma foto com a busca '${q}'`]
      })
      return
    }

    res.status(200).json(photos)

  } catch (error) {
    res.status(422).json({
      errors: ['Houve um erro, por favor tente mais tarde.']
    })
    return
  }

}

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos
}