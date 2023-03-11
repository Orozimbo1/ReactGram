import './App.css'

// Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Pages
import { Home, Login, Register } from './pages'

// Components
import { Navbar, Footer } from './components'

// Context

// Hooks

// Middlewares

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
