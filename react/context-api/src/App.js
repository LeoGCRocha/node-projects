import './App.css';

// pages
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

// react
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// components
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <h1>Hello world...</h1>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
