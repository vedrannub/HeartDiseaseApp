/**
 * Centralized Axios configuration with environment-based API URLs
 * Handles request/response transformations and authentication
 */

import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

// API Base URLs
const API_CONFIG = {
  MAIN_API: process.env.REACT_APP_MAIN_API_URL || 'http://localhost:5142',
  ML_API: process.env.REACT_APP_ML_API_URL || 'http://localhost:5050',
};

// Create Axios instances for different APIs
export const mainApiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.MAIN_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const mlApiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.ML_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Utility functions for case transformation
const toCamelCase = (object: any): any => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map(toCamelCase);
  }

  const transformed: any = {};
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const camelKey = key.replace(/(_\w)|(-\w)/g, (match) => match[1].toUpperCase());
      transformed[camelKey] = toCamelCase(object[key]);
    }
  }
  return transformed;
};

const toSnakeCase = (object: any): any => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map(toSnakeCase);
  }

  const transformed: any = {};
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const snakeKey = key
        .replace(/\.?([A-Z]+)/g, (_, char) => '_' + char.toLowerCase())
        .replace(/^_/, '');
      transformed[snakeKey] = toSnakeCase(object[key]);
    }
  }
  return transformed;
};

// Add interceptors to main API client
mainApiClient.interceptors.request.use(
  (config) => {
    // Add JWT token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Transform request data
    if (config.data) {
      config.data = toSnakeCase(config.data);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

mainApiClient.interceptors.response.use(
  (response) => {
    // Transform response data to camelCase
    if (response.data) {
      response.data = toCamelCase(response.data);
    }
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Add interceptors to ML API client
mlApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data) {
      config.data = toSnakeCase(config.data);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

mlApiClient.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = toCamelCase(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { API_CONFIG };
