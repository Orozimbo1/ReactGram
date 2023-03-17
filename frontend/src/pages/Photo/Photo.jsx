import './Photo.css'

import { uploads } from '../../utils/config'

// Components
import Message from '../../components/Messages/Message'
import { Link } from 'react-router-dom'
import { PhotoItem, LikeContainer } from '../../components'

// Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useResetComponentMessage } from '../../hook'

// Redux
import { getPhotoById, like } from '../../slices/photoSlice'

const Photo = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const resetMessage = useResetComponentMessage(dispatch) 

  const { user } = useSelector((state) => state.auth)
  const { photo, loading, message, error } = useSelector((state) => state.photo)

  // Load photo data
  useEffect(() => {
    dispatch(getPhotoById(id))
  }, [dispatch, id])

  // Like
  const handleLike = (photo) => {
    dispatch(like(photo._id))

    resetMessage()
  }

  if(loading) {
    return <p>Carregando ...</p>
  }

  return (
    <div id='photo'>
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type='error' />}
        {message && <Message msg={message} type='success' />}
      </div>
    </div>
  )
}

export default Photo