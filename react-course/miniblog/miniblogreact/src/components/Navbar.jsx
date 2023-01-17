import { NavLink } from "react-router-dom";
import { useAutentication } from "../hooks/useAutentication";
import { useAuthValue } from "../context/authContext";

import styles from './navbar.module.css'

const Navbar = () => {
    const { user } = useAuthValue()
    const { logout } = useAutentication()

    return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
            Mini <span>Blog</span>
        </NavLink>
        <ul className={styles.link_list}>
            <li>
                <NavLink to="/" className={ ({ isActive }) => (isActive ? styles.active : "") } >
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink to="/about" className={ ({ isActive }) => (isActive ? styles.active : "") } >
                    Sobre
                </NavLink>
            </li>

            {/* Usuario sem autenticacao */}
            {!user && (
                <>
                    <li>
                        <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")} >
                            Login
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : "")} >
                            Registro
                        </NavLink>
                    </li>
                </>
            )}

            {/* Usuario autenticado */}
            {user && (
                <>
                    <li>
                        <NavLink to="/posts/create" className={({ isActive }) => (isActive ? styles.active : "")} >
                            Novo Post
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : "")} >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={ logout }> Sair </button>
                    </li>
                </>
            )}
        </ul>
    </nav>)
}

export default Navbar