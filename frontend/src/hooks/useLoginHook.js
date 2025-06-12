// src/hooks/useLoginHook.js
import axios from 'axios';
import { useState } from 'react';

export const useLoginHook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (formData) => {
    setLoading(true);
    setError(null);
    console.log('Attempting login with:', { email: formData.email });

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Login response:', response.data);
      
      if (response.data && response.data.user) {
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        setLoading(false);
        return response.data;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setLoading(false);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      return null;
    }
  };

  return { login, loading, error };
};
