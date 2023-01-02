import './App.css';

// react
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

// hooks
import { useState, useEffect } from 'react'
import { useAutentication } from './hooks/useAutentication';

// pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Search from './pages/Search/Search';
import Post from './pages/Post/Post'
import EditPost from './pages/CreatePost/EditPost'
import Dashboard from './pages/Dashboard/Dashboard';
import CreatePost from './pages/CreatePost/CreatePost';

// components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// context
import { AuthProvider } from './context/authContext';


function App() {
  const [ user, setUser ] = useState(undefined)
  const { auth } = useAutentication()
  
  const loadingUser =  (user === undefined)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if (loadingUser) {
    return <div className="App">Loading...</div>
  } 

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar/> 
          <div className='container'>
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              
              <Route 
                path="/about" 
                element={<About />} 
              />
              
              <Route 
                  path="/login" 
                  element={!user ? <Login /> : <Navigate to="/" /> } 
              />
              
              <Route 
                path="/register" 
                element={!user ? <Register /> : <Navigate to="/" /> } 
              />

              <Route 
                path="/dashboard" 
                element={user ? <Dashboard /> : <Navigate to="/" /> } 
              />

              <Route 
                path="/posts/create" 
                element={user ? <CreatePost /> : <Navigate to="/" /> } 
              />

              <Route
                path="/search"
                element={<Search />}
              />

              <Route
                path="/posts/:id"
                element={<Post />}
              />

              <Route
                path='/posts/:id/edit'
                element={user ? <EditPost /> : <Navigate to="/" /> }
              />

            </Routes>
          </div>

        </BrowserRouter>
      </AuthProvider>
      <Footer/>
    </div>
  );
}

export default App;