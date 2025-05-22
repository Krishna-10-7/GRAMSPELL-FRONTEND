import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GrammarCorrector from './components/GrammarCorrector'
import Features from './components/Features'
import Layout from './components/Layout'
import './App.css'

function App() {
  return (
    <Router basename="/GRAMSPELL-FRONTEND/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GrammarCorrector />} />
          <Route path="features" element={<Features />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
