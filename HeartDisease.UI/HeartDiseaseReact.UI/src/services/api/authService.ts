/**
 * Authentication Service
 * Handles user registration, login, and token management
 */

import { mainApiClient } from './axiosClient';
import { RegisterUserDto, LoginUserDto, LoginResponseDto, UserProfileDto } from '../../types/dtos';
import { AxiosError } from 'axios';

export const AuthService = {
  /**
   * Register a new user
   */
  register: async (userData: RegisterUserDto): Promise<UserProfileDto> => {
    try {
      const response = await mainApiClient.post<UserProfileDto>('/users/register', userData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Login user and get JWT token
   */
  login: async (credentials: LoginUserDto): Promise<string> => {
    try {
      const response = await mainApiClient.post<LoginResponseDto>('/users/login', credentials);
      const token = response.data.token;
      
      // Store token in localStorage
      localStorage.setItem('authToken', token);
      
      return token;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Logout user
   */
  logout: (): void => {
    localStorage.removeItem('authToken');
  },

  /**
   * Get stored token
   */
  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Delete user account
   */
  deleteUser: async (userId: string): Promise<void> => {
    try {
      await mainApiClient.delete(`/users/${userId}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

/**
 * Helper function to handle API errors
 */
const handleApiError = (error: unknown): Error => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error.message;
    return new Error(message);
  }
  return error instanceof Error ? error : new Error('An unknown error occurred');
};
