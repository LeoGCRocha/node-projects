import './Navbar.css'

import { NavLink, Link } from 'react-router-dom'
import { BsSearch, 
        BsHouseDoorFill, 
        BsFillPersonFill, 
        BsFillCameraFill 
} from 'react-icons/bs'

const Navbar = () => {
  return (
    <nav id="nav">
      <Link to="/">RactGram</Link>
      <form id='search-form'>
        <BsSearch />
        <input type="text" placeholder="Buscar" />
      </form>
      <ul id='nav-links'>
        <li>
          <NavLink to="/">
            <BsHouseDoorFill></BsHouseDoorFill>
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Registrar</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar