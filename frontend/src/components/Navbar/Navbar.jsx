import './Navbar.css'
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill, BsCameraFill } from 'react-icons/bs'

// Components
import { NavLink, Link } from 'react-router-dom'

// Hooks
import { useState } from 'react'
import { useAuth } from '../../hook'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { auth } = useAuth()
  const { user } = useSelector((state) => state.auth)

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
              <span>Sair</span>
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