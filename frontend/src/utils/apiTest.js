// API Connection Test Utility
import axios from 'axios';

const getApiBaseUrl = () => {
  const apiUrl = process.env.REACT_APP_API_URL || process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  return apiUrl + '/api';
};

export const testApiConnection = async () => {
  const baseUrl = getApiBaseUrl();
  console.log('🧪 Testing API connection to:', baseUrl);
  
  try {
    // Test basic connectivity
    const healthResponse = await axios.get(baseUrl.replace('/api', '/health'), {
      timeout: 10000
    });
    console.log('✅ Health check successful:', healthResponse.data);
    
    // Test debug endpoint
    const debugResponse = await axios.get(baseUrl.replace('/api', '/debug'), {
      timeout: 10000
    });
    console.log('✅ Debug check successful:', debugResponse.data);
    
    // Test scanner functionality
    const scannerResponse = await axios.get(baseUrl + '/analysis/test/scanner', {
      timeout: 30000
    });
    console.log('✅ Scanner test successful:', scannerResponse.data);
    
    return {
      success: true,
      baseUrl,
      health: healthResponse.data,
      debug: debugResponse.data,
      scanner: scannerResponse.data
    };
  } catch (error) {
    console.error('❌ API connection test failed:', error);
    return {
      success: false,
      baseUrl,
      error: {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      }
    };
  }
};

export const logEnvironmentInfo = () => {
  console.log('🔍 Frontend Environment Info:');
  console.log('- REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
  console.log('- REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- Computed API Base URL:', getApiBaseUrl());
};
