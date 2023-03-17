import './Home.css'

// Components
import { LikeContainer, PhotoItem } from '../../components'
import { Link } from 'react-router-dom'

// Hooks
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useResetComponentMessage } from '../../hook'

// Redux
import { getPhotos, like } from '../../slices/photoSlice'


const Home = () => {

  const dispatch = useDispatch()

  const resetMessage = useResetComponentMessage(dispatch)

  const { user } = useSelector((state) => state.auth)
  const { photos, loading } = useSelector((state) => state.photo)

  // Load all photos
  useEffect(() => {
    dispatch(getPhotos())
  }, [dispatch])

  // Like a photo
  const handleLike = (photo) => {
    dispatch(like(photo._id))

    resetMessage()
  }

  if(loading) {
    return <p>Carregando ...</p>
  }

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home