import './Search.css'

// Hooks
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useResetComponentMessage, useQuery } from '../../hook'

// Components
import { LikeContainer, PhotoItem } from '../../components'
import { Link } from 'react-router-dom'

// Redux
import { searchPhotos, like } from '../../slices/photoSlice'

const Search = () => {
  const query = useQuery()
  const search = query.get('q')

  const dispatch = useDispatch()

  const resetMessage = useResetComponentMessage(dispatch)

  const { user } = useSelector((state) => state.auth)
  const { photos, loading } = useSelector((state) => state.photo)

  // Load Photos
  useEffect(() => {
    dispatch(searchPhotos(search))
  }, [dispatch, search])

  // Like a photo
  const handleLike = (photo) => {
    dispatch(like(photo._id))

    resetMessage()
  }

  if(loading) {
    return <p>Carregano ...</p>
  }

  return (
    <div id="search">
      {photos.errors ? (
        <>
          <p className="no-photos">
            {photos.errors}
          </p>
        </>
      ) :
      photos && photos.map((photo) => (
        <div className="" key={photo._id}>
          <PhotoItem photo={photo} />
          <LikeContainer photo={photo} user={user} handleLike={handleLike} />
          <Link className='btn' to={`/photos/${photo._id}`}>Ver mais</Link>
        </div>
      ))}
    </div>
  )
}

export default Search