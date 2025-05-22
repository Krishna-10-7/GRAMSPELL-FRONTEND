import { Link } from 'react-router-dom'
import './Navbar.css' // We'll create this next

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo">
          <Link to="/" className="logo-text">GrammarAI</Link>
        </div>
        <div className="nav-links">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <Link to="/features" className="nav-link">Features</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 