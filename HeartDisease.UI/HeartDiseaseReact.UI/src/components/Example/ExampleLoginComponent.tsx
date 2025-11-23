/**
 * Example Login Component using new architecture
 * Shows how to use Redux auth slice and services
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Alert, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/reducers/store';
import { login, clearError } from '../../store/slices/authSlice';
import { LoginUserDto } from '../../types/dtos';

const ExampleLoginComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [credentials, setCredentials] = useState<LoginUserDto>({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Dispatch login action - returns a promise
      await dispatch(login(credentials)).unwrap();
      // Navigate to dashboard on success
      navigate('/dashboard');
    } catch (err) {
      // Error is already in Redux state, no need to do anything
      console.error('Login failed:', err);
    }
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
      <h2>Login</h2>

      {error && (
        <Alert
          severity="error"
          onClose={handleClearError}
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={credentials.email}
        onChange={handleInputChange}
        margin="normal"
        disabled={loading}
        required
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleInputChange}
        margin="normal"
        disabled={loading}
        required
      />

      <Button
        fullWidth
        variant="contained"
        type="submit"
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Login'}
      </Button>
    </Box>
  );
};

export default ExampleLoginComponent;
