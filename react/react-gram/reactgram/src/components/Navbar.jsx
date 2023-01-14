import './Navbar.css'

import { NavLink, Link } from 'react-router-dom'
import { BsSearch, 
        BsHouseDoorFill, 
        BsFillPersonFill, 
        BsFillCameraFill 
} from 'react-icons/bs'

// Hooks
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, reset } from '../slices/authSlice'

const Navbar = () => {

  const { auth } = useAuth()
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch =  useDispatch()
  const [query, setQuery] = useState('')

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())

    navigate('/login')
  }

  const handleSearch = (e) => {  
    e.preventDefault()
    if (query) {
      return navigate(`/search/q=${query}`)
    }
  }

  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>
      <form id='search-form' onSubmit={handleSearch}>
        <BsSearch />
        <input 
          type="text" 
          placeholder="Buscar" 
          onChange={ (e) => setQuery(e.target.value) }
          value={query}
        />
      </form>
      <ul id='nav-links'>
        {
          auth ? (
            <>
              <li>
                <NavLink to="/">
                  <BsHouseDoorFill></BsHouseDoorFill>
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to={`/users/${user._id}`}>
                      <BsFillCameraFill></BsFillCameraFill>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile">
                      <BsFillPersonFill></BsFillPersonFill> 
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <span onClick={handleLogout}>Sair</span>
              </li>
            </>
          ) : (
            <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Registrar</NavLink>
                </li>
            </>
          )
        }
      </ul>
    </nav>
  )
}

export default Navbar