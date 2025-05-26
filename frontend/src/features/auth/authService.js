import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  console.log('Register API response:', response.data); // Debug log

  if (response.data) {
    if (!response.data.username) {
      throw new Error('Username not found in registration response');
    }
    localStorage.setItem('user', JSON.stringify(response.data));
    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // <-- Save token directly
    }
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  console.log('Login API response:', response.data); // Debug log

  if (response.data) {
    if (!response.data.username) {
      throw new Error('Username not found in login response');
    }
    localStorage.setItem('user', JSON.stringify(response.data));
    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // <-- Save token directly
    }
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token'); // <-- Remove token on logout
  localStorage.clear(); // Clear all localStorage data
  sessionStorage.clear(); // Clear all sessionStorage data
};

// Get token from local storage
const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token;
};

// Create axios instance with auth header
const createAuthHeader = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

// Reset password
const resetPassword = async (userData) => {
  try {
    console.log('Sending reset password request:', userData.email); // Debug log
    const response = await axios.post(API_URL + 'reset-password', userData);
    console.log('Reset password response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Reset password error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    const message = 
      (error.response?.data?.message) ||
      error.message ||
      'Failed to reset password';
    throw new Error(message);
  }
};

const authService = {
  register,
  login,
  logout,
  getToken,
  createAuthHeader,
  resetPassword,
};

export default authService;