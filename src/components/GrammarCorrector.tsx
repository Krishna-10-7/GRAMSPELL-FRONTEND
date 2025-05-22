import { useState, useEffect } from 'react'
// Remove Link import as it's no longer needed here
// import { Link } from 'react-router-dom' 
import './GrammarCorrector.css'

const API_URL = 'http://localhost:8001'

function GrammarCorrector() {
  const [inputText, setInputText] = useState('')
  const [correctedText, setCorrectedText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking')
  // Remove darkMode state and effects as they are handled in Layout
  // const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check API status on component mount
    checkApiStatus()
    
    // Remove system dark mode preference check
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    // setDarkMode(prefersDark)
  }, [])

  // Remove darkMode effect
  // useEffect(() => {
  //   // Update body class when dark mode changes
  //   document.body.classList.toggle('dark-mode', darkMode)
  // }, [darkMode])

  // Remove toggleDarkMode function
  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode)
  // }

  const checkApiStatus = async () => {
    try {
      console.log('Checking API status...')
      console.log('API URL:', `${API_URL}/health`)
      
      const response = await fetch(`${API_URL}/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit'
      })
      
      console.log('API response status:', response.status)
      console.log('API response headers:', Object.fromEntries(response.headers.entries()))
      
      if (response.ok) {
        const data = await response.json()
        console.log('API health check response:', data)
        setApiStatus(data.model_loaded ? 'online' : 'offline')
      } else {
        console.error('API health check failed:', response.status)
        const errorText = await response.text()
        console.error('Error response:', errorText)
        setApiStatus('offline')
      }
    } catch (error) {
      console.error('API status check failed:', error)
      if (error instanceof Error) {
        console.error('Error details:', error.message)
        console.error('Error stack:', error.stack)
      }
      setApiStatus('offline')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setInputText(text)
    setCharCount(text.length)
    setWordCount(text.trim().split(/\s+/).filter(Boolean).length)
  }

  const handleCorrection = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to correct')
      return
    }

    if (apiStatus !== 'online') {
      setError('API is not available. Please try again later.')
      return
    }

    setError('')
    setIsLoading(true)
    try {
      console.log('Sending request to:', `${API_URL}/correct`)
      const response = await fetch(`${API_URL}/correct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || 'Failed to correct text')
      }

      const data = await response.json()
      console.log('Received response:', data)
      setCorrectedText(data.corrected_text)
    } catch (error) {
      console.error('Error during correction:', error)
      setError(error instanceof Error ? error.message : 'Failed to correct text. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(correctedText)
  }

  return (
    // The main content of the GrammarCorrector page
    <div className="editor-container">
      <div className="editor-header">
        <div className="editor-stats">
          <div className="stat">
            <span className="stat-label">Words</span>
            <span className="stat-value">{wordCount}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Characters</span>
            <span className="stat-value">{charCount}</span>
          </div>
          <div className="stat">
            <span className="stat-label">API Status</span>
            <span className={`stat-value ${apiStatus}`}>
              {apiStatus === 'checking' ? 'Checking...' : 
               apiStatus === 'online' ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        <button
          className="correct-button"
          onClick={handleCorrection}
          disabled={isLoading || apiStatus !== 'online'}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              <span>Correcting...</span>
            </>
          ) : (
            <>
              <span className="button-icon">✓</span>
              <span>Correct Text</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">!</span>
          {error}
        </div>
      )}

      <div className="editor-content">
        <div className="editor-section">
          <div className="editor-label">Original Text</div>
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type or paste your text here to check for grammar and spelling errors..."
            className="editor-textarea"
            rows={12}
          />
        </div>

        {correctedText && (
          <div className="editor-section">
            <div className="editor-label">
              <span>Corrected Text</span>
              <button className="copy-button" onClick={handleCopy}>
                <span className="copy-icon">📋</span>
                Copy
              </button>
            </div>
            <textarea
              value={correctedText}
              readOnly
              className="editor-textarea corrected"
              rows={12}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default GrammarCorrector 