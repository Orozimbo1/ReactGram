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

  const [query, setQuery] = useState('')

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())

    navigate('/login')
  }

  const handleSearch = (e) => {
    e.preventDefault()

    if(query) {
      return navigate(`/search?q=${query}`)
    }

  }

  return (
    <nav id="nav">
      <Link to='/'>ReactGram</Link>
      <form id='search-form' onSubmit={handleSearch}>
        <BsSearch />
        <input 
          type="text" 
          placeholder='pesquisar' 
          onChange={(e) => setQuery(e.target.value)}
          value={query || ''}
        />
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