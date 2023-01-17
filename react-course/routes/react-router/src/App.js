import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// pages
import About from './pages/About'
import Home from './pages/Home'
import Product from './pages/Product'
import Info from './pages/Info'
import NotFound from './pages/NotFound'
import Search from './pages/Search'

// components
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar'

function App() {
  return (
    <div className="App">
      <h1>React Routter</h1>
      <BrowserRouter>
        <Navbar/>
        <SearchBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/products/:id/info" element={<Info />} />          
          <Route path="/products/:id" element={<Product />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/company" element={<Navigate to="/about"></Navigate>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
