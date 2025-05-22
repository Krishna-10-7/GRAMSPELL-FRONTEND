import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Layout.css'
import Navbar from './Navbar' // We'll create this next

function Layout() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check system dark mode preference on mount
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(prefersDark)
  }, [])

  useEffect(() => {
    // Update body class when dark mode changes
    document.body.classList.toggle('dark-mode', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="main-container">
        <Outlet /> {/* Renders the current page content (GrammarCorrector or Features) */}
      </main>
      {/* We'll add the footer here later if needed */}
    </div>
  )
}

export default Layout 