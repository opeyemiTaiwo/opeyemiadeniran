import { useState, useEffect } from 'react';
import { Client } from '@gradio/client';
import './ModelPredictor.css';

function ModelPredictor() {
  const [sourceCode, setSourceCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [client, setClient] = useState(null);

  // Initialize Gradio client
  useEffect(() => {
    const initClient = async () => {
      try {
        const gradioClient = await Client.connect("opethaiwoh/vun-smt");
        setClient(gradioClient);
        console.log("Gradio client connected successfully");
      } catch (err) {
        console.error("Failed to connect to Gradio:", err);
        setError("Failed to connect to AI model. Please refresh the page.");
      }
    };
    initClient();
  }, []);

  // Sample contracts (matching your Gradio app)
  const SAMPLE_VULNERABLE = `pragma solidity ^0.8.0;

contract VulnerableBank {
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        
        // VULNERABILITY: External call before state update
        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "Failed to send Ether");
        
        // State change AFTER external call - allows reentrancy!
        balances[msg.sender] -= _amount;
    }
    
    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }
}`;

  const SAMPLE_SAFE = `pragma solidity ^0.8.0;

contract SafeBank {
    mapping(address => uint) public balances;
    bool private locked;
    
    modifier nonReentrant() {
        require(!locked, "No reentrancy allowed");
        locked = true;
        _;
        locked = false;
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint _amount) public nonReentrant {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        
        // SAFE: State change BEFORE external call
        balances[msg.sender] -= _amount;
        
        // External call after state update
        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "Failed to send Ether");
    }
    
    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }
}`;

  const analyzeContract = async () => {
    if (!sourceCode.trim()) {
      setError("Please enter Solidity source code to analyze");
      return;
    }

    if (!client) {
      setError("AI model not connected. Please refresh the page.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Call the predict endpoint with positional argument (the way Gradio expects it)
      const response = await client.predict("/predict", [sourceCode]);

      console.log("Response:", response); // Debug log

      if (response && response.data && response.data.length > 0) {
        setResult(response.data[0]);
      } else {
        throw new Error('No results returned from the model');
      }
    } catch (err) {
      console.error("Full error:", err);
      
      // Check if it's a connection/startup error
      const errorMsg = err.message || err.toString();
      
      if (errorMsg.includes('starting') || 
          errorMsg.includes('Building') ||
          errorMsg.includes('STARTING') ||
          errorMsg.includes('loading')) {
        setError("The AI model is starting up. Please wait 30-60 seconds and try again.");
      } else {
        setError(`Analysis failed: ${errorMsg}. Please refresh the page and try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadSample = (sampleCode) => {
    setSourceCode(sampleCode);
    setResult(null);
    setError(null);
  };

  const clearAll = () => {
    setSourceCode('');
    setResult(null);
    setError(null);
  };

  // Format result for display
  const formatResult = (data) => {
    if (!data) return null;

    // Handle error responses from the API
    if (data["❌ Error"] || data["⚠️ Error"] || data["❌ Analysis Failed"]) {
      return (
        <div className="result-content error-result">
          <div className="result-item error">
            <span className="result-key">Error:</span>
            <span className="result-value">{data["❌ Error"] || data["⚠️ Error"] || data["❌ Analysis Failed"]}</span>
          </div>
          {data["Help"] && (
            <div className="result-item">
              <span className="result-key">Help:</span>
              <span className="result-value">{data["Help"]}</span>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="result-content">
        {Object.entries(data).map(([key, value], index) => {
          // Skip empty keys used for spacing
          if (key.trim() === '' || key.trim() === ' ' || key.trim() === '  ') {
            return <div key={index} className="result-spacer"></div>;
          }

          // Handle section headers (empty values)
          if (value === '') {
            return (
              <div key={index} className="result-section-header">
                {key}
              </div>
            );
          }

          // Determine styling based on content
          const isRiskAssessment = key.includes('Risk Assessment');
          const isHighRisk = value.includes('HIGH RISK') || value.includes('🔴');
          const isMediumRisk = value.includes('MEDIUM RISK') || value.includes('🟡');
          const isLowRisk = value.includes('LOW RISK') || value.includes('🟢');
          const isWarning = key.includes('Critical') || value.includes('⚠️') || isHighRisk || isMediumRisk;
          const isSuccess = value.includes('✅') || value.includes('✓') || isLowRisk;
          const isProbability = key.includes('Probability') || key.includes('Confidence');

          return (
            <div 
              key={index} 
              className={`result-item ${isRiskAssessment ? 'risk-assessment' : ''} ${isWarning ? 'warning' : ''} ${isSuccess ? 'success' : ''} ${isProbability ? 'probability' : ''}`}
            >
              <span className="result-key">{key}:</span>
              <span className="result-value">{value}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="model-predictor">
      <div className="predictor-header">
        <h3>🔐 Smart Contract Security Analyzer</h3>
        <p>AI-powered reentrancy vulnerability detection with 95%+ accuracy</p>
      </div>

      <div className="predictor-grid">
        <div className="code-section">
          <div className="code-header">
            <label>📝 Solidity Smart Contract Code</label>
            <div className="sample-buttons">
              <button 
                className="sample-btn vulnerable"
                onClick={() => loadSample(SAMPLE_VULNERABLE)}
                disabled={loading}
              >
                ⚠️ Vulnerable Example
              </button>
              <button 
                className="sample-btn safe"
                onClick={() => loadSample(SAMPLE_SAFE)}
                disabled={loading}
              >
                ✅ Safe Example
              </button>
            </div>
          </div>

          <textarea
            className="code-input"
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            placeholder="Paste your Solidity smart contract code here..."
            rows={20}
            disabled={loading}
          />

          <div className="action-buttons">
            <button 
              className="analyze-btn"
              onClick={analyzeContract}
              disabled={loading || !sourceCode.trim()}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                <>
                  🔍 Analyze Contract
                </>
              )}
            </button>
            <button 
              className="clear-btn"
              onClick={clearAll}
              disabled={loading}
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        <div className="results-section">
          <div className="results-header">
            <label>🎯 Security Analysis Results</label>
          </div>

          <div className="results-container">
            {loading && (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Analyzing contract security...</p>
                <small>This may take a few seconds</small>
              </div>
            )}

            {error && (
              <div className="error-state">
                <span className="error-icon">⚠️</span>
                <p>{error}</p>
                <small>If the problem persists, the Hugging Face Space may be restarting. Please wait a moment.</small>
              </div>
            )}

            {result && !loading && (
              <div className="result-display">
                {formatResult(result)}
              </div>
            )}

            {!result && !loading && !error && (
              <div className="empty-state">
                <span className="empty-icon">📊</span>
                <p>Analysis results will appear here</p>
                <small>Enter your smart contract code and click "Analyze Contract"</small>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="predictor-footer">
        <div className="info-section">
          <h4>📚 About Reentrancy Vulnerabilities</h4>
          <p>
            Reentrancy occurs when a contract makes an external call before updating its state, 
            allowing attackers to recursively call back and drain funds.
          </p>
          <p><strong>Famous Example:</strong> The DAO Hack (2016) - $60M stolen</p>
        </div>

        <div className="best-practices">
          <h4>🛡️ Best Practices</h4>
          <ul>
            <li>✅ Use reentrancy guards (nonReentrant modifier)</li>
            <li>✅ Follow CEI pattern (Checks-Effects-Interactions)</li>
            <li>✅ Update state before external calls</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ModelPredictor;