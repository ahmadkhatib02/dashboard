import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SignIn from './pages/SignIn.jsx'
import Dashboard from './pages/Dashboard.jsx'
import InstallButton from './components/InstallButton'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is already authenticated on app load
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Function to handle successful login
  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem('isAuthenticated', 'true')
  }

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
  }

  return (
    <Router>
      <Routes>
        {/* Sign In Route */}
        <Route
          path="/signin"
          element={
            isAuthenticated ?
            <Navigate to="/dashboard" replace /> :
            <SignIn onLogin={handleLogin} />
          }
        />

        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ?
            <Dashboard onLogout={handleLogout} /> :
            <Navigate to="/signin" replace />
          }
        />

        {/* Default Route - redirect to appropriate page */}
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/signin"} replace />
          }
        />

        {/* Catch all other routes and redirect */}
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/signin"} replace />
          }
        />
      </Routes>

      {/* PWA Install Button */}
      <InstallButton />
    </Router>
  )
}

export default App
