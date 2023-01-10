import './App.css';

// pages
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile'
import Photo from './pages/Photo/Photo'

//components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Hooks
import { useAuth } from './hooks/useAuth'

function App() {

  const { auth, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
        <Navbar />
          <Routes>
            <Route path="/" element={auth ? <Home/> : <Navigate to="/login" />} />
            <Route path="/register" element={!auth ? <Register/> : <Navigate to="/" />} />
            <Route path="/login" element={!auth ? <Login/> : <Navigate to="/" />} />
            <Route path="/profile" element={auth ? <EditProfile/> : <Navigate to="/login" />} />
            <Route 
              path="/users/:id"
              element={auth ? <Profile /> : <Navigate to="/login" /> } 
            />
            <Route 
              path="/photos/:id"
              element={auth ? <Photo /> : <Navigate to="login"/>}
            />
          </Routes> 
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
