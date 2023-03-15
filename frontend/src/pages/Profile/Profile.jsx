import './Profile.css'

import { uploads } from '../../utils/config'

// Components
import Message from '../../components/Messages/Message'
import { Link } from 'react-router-dom'
import { BsFillEyeFill, BsPencilFill, BsXlg } from 'react-icons/bs'

// Hooks
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// Redux

const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}

export default Profile