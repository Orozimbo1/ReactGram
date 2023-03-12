import './App.css'

// Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Pages
import { Home, Login, Register } from './pages'

// Components
import { Navbar, Footer } from './components'

// Context

// Hooks
import { useAuth } from './hook'

// Middlewares

function App() {
  const { auth, loading } = useAuth()

  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route 
            path='/' 
            element={auth ? <Home /> : <Navigate to='/login' />} 
          />
          <Route 
            path='/login' 
            element={!auth ? <Login /> : <Navigate to='/' />} 
          />
          <Route 
            path='/register' 
            element={!auth ? <Register /> : <Navigate to='/' />} 
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
