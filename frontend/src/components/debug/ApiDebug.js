import React, { useState } from 'react';
import { testApiConnection, logEnvironmentInfo } from '../../utils/apiTest';

const ApiDebug = () => {
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const runApiTest = async () => {
    setIsLoading(true);
    logEnvironmentInfo();
    
    try {
      const result = await testApiConnection();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        error: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      margin: '20px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>🔧 API Debug Panel</h3>
      
      <button 
        onClick={runApiTest} 
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          backgroundColor: isLoading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? 'Testing...' : 'Test API Connection'}
      </button>

      {testResult && (
        <div style={{ marginTop: '20px' }}>
          <h4>Test Results:</h4>
          <div style={{
            backgroundColor: testResult.success ? '#d4edda' : '#f8d7da',
            border: `1px solid ${testResult.success ? '#c3e6cb' : '#f5c6cb'}`,
            borderRadius: '4px',
            padding: '10px',
            color: testResult.success ? '#155724' : '#721c24'
          }}>
            <strong>Status:</strong> {testResult.success ? '✅ Success' : '❌ Failed'}
          </div>
          
          <pre style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '4px',
            padding: '10px',
            marginTop: '10px',
            fontSize: '12px',
            overflow: 'auto',
            maxHeight: '400px'
          }}>
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p><strong>Environment Variables:</strong></p>
        <ul>
          <li>REACT_APP_API_URL: {process.env.REACT_APP_API_URL || 'Not set'}</li>
          <li>REACT_APP_API_BASE_URL: {process.env.REACT_APP_API_BASE_URL || 'Not set'}</li>
          <li>NODE_ENV: {process.env.NODE_ENV}</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiDebug;
