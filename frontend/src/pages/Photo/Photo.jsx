import './Photo.css'

import { uploads } from '../../utils/config'

// Components
import Message from '../../components/Messages/Message'
import { Link } from 'react-router-dom'
import { PhotoItem } from '../../components'

// Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// Redux
import { getPhotoById } from '../../slices/photoSlice'

const Photo = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { photo, loading, message, error } = useSelector((state) => state.photo)

  // Load photo data
  useEffect(() => {
    dispatch(getPhotoById(id))
  }, [dispatch, id])

  // Like and comments

  if(loading) {
    return <p>Carregando ...</p>
  }

  return (
    <div id='photo'>
      <PhotoItem photo={photo} />
    </div>
  )
}

export default Photo