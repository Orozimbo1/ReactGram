import './Navbar.css'
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs'

// Components
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav id="nav">
      <Link to='/'>ReactGram</Link>
      <form id='search-form'>
        <BsSearch />
        <input type="text" placeholder='pesquisar' />
      </form>
      <ul id="nav-links">
        <li>
          <NavLink to='/'>
            <BsHouseDoorFill />
          </NavLink>
        </li>
        <li>
          <NavLink to='/login'>Entrar</NavLink>
        </li>
        <li>
          <NavLink to='/register'>Cadastrar</NavLink>
        </li>
        
      </ul>
    </nav>
  )
}

export default Navbar