import './Photo.css'

import { uploads } from '../../utils/config'

// Components
import Message from '../../components/Messages/Message'
import { Link } from 'react-router-dom'

// Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// Redux

const Photo = () => {
  return (
    <div>
      <h1>Photo</h1>
    </div>
  )
}

export default Photo