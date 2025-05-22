import { useState } from 'react'
import './Features.css'

function Features() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="features-container">
      <div className="features-header">
        <h1>GrammarAI Features</h1>
        <p className="features-subtitle">Advanced grammar correction powered by state-of-the-art AI</p>
      </div>

      <div className="features-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'model' ? 'active' : ''}`}
          onClick={() => setActiveTab('model')}
        >
          Model Details
        </button>
        <button 
          className={`tab-button ${activeTab === 'usage' ? 'active' : ''}`}
          onClick={() => setActiveTab('usage')}
        >
          Usage Guide
        </button>
      </div>

      <div className="features-content">
        {activeTab === 'overview' && (
          <div className="feature-section">
            <h2>Advanced Grammar Correction</h2>
            <p>GrammarAI uses a state-of-the-art T5-based language model to provide accurate and context-aware grammar corrections. Our model has been specifically fine-tuned for grammar correction tasks, ensuring high-quality results.</p>
            
            <div className="feature-grid">
              <div className="feature-card">
                <h3>Real-time Correction</h3>
                <p>Get instant grammar and spelling corrections as you type or paste your text.</p>
              </div>
              <div className="feature-card">
                <h3>Context-Aware</h3>
                <p>Our model understands context to provide more accurate and natural corrections.</p>
              </div>
              <div className="feature-card">
                <h3>Multiple Languages</h3>
                <p>Currently supporting English with plans to expand to other languages.</p>
              </div>
              <div className="feature-card">
                <h3>Easy to Use</h3>
                <p>Simple and intuitive interface for quick and efficient text correction.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'model' && (
          <div className="feature-section">
            <h2>Model Architecture</h2>
            <p>Our grammar correction model is built on the T5 (Text-to-Text Transfer Transformer) architecture, which has been fine-tuned specifically for grammar correction tasks.</p>

            <div className="model-details">
              <div className="model-spec">
                <h3>Technical Specifications</h3>
                <ul>
                  <li>Base Model: T5 (Text-to-Text Transfer Transformer)</li>
                  <li>Model Size: Optimized for efficient processing</li>
                  <li>Training Data: Large corpus of English text</li>
                  <li>Fine-tuning: Specialized for grammar correction</li>
                </ul>
              </div>

              <div className="model-capabilities">
                <h3>Capabilities</h3>
                <ul>
                  <li>Grammar and spelling correction</li>
                  <li>Punctuation and capitalization</li>
                  <li>Sentence structure improvement</li>
                  <li>Context-aware corrections</li>
                  <li>Maintains original meaning</li>
                </ul>
              </div>
            </div>

            <div className="model-performance">
              <h3>Performance Metrics</h3>
              <div className="metrics-grid">
                <div className="metric-card">
                  <h4>Accuracy</h4>
                  <p>High precision in grammar correction</p>
                </div>
                <div className="metric-card">
                  <h4>Speed</h4>
                  <p>Fast processing for real-time correction</p>
                </div>
                <div className="metric-card">
                  <h4>Reliability</h4>
                  <p>Consistent performance across different text types</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="feature-section">
            <h2>How to Use</h2>
            <div className="usage-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Enter Your Text</h3>
                  <p>Type or paste your text into the input area. The editor supports both short and long-form content.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Click Correct</h3>
                  <p>Press the "Correct Text" button to process your text. The model will analyze and correct any grammar issues.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Review & Copy</h3>
                  <p>Review the corrected text and use the copy button to copy it to your clipboard.</p>
                </div>
              </div>
            </div>

            <div className="usage-tips">
              <h3>Tips for Best Results</h3>
              <ul>
                <li>Break long texts into smaller chunks for better processing</li>
                <li>Ensure your text is in English for optimal results</li>
                <li>Review corrections before using them in important documents</li>
                <li>Use the character and word count features to monitor text length</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Features 