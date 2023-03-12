import './Navbar.css'
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill, BsCameraFill } from 'react-icons/bs'

// Components
import { NavLink, Link } from 'react-router-dom'

// Hooks
import { useState } from 'react'
import { useAuth } from '../../hook'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Redux
import { logout, reset } from '../../slices/authSlice'

const Navbar = () => {
  const { auth } = useAuth()
  const { user } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())

    navigate('/login')
  }

  return (
    <nav id="nav">
      <Link to='/'>ReactGram</Link>
      <form id='search-form'>
        <BsSearch />
        <input type="text" placeholder='pesquisar' />
      </form>
      <ul id="nav-links">
        {auth ? (
          <>
            <li>
              <NavLink to='/'>
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsCameraFill />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to={'/profile'}>
                <BsFillPersonFill />
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to='/login'>Entrar</NavLink>
            </li>
            <li>
              <NavLink to='/register'>Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar