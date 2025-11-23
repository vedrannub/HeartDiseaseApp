/**
 * Predictions Service
 * Handles prediction CRUD operations and ML model integration
 */

import { mainApiClient, mlApiClient } from './axiosClient';
import {
  PredictionDto,
  CreatePredictionDto,
  PredictionRequestDto,
  PredictionResponseDto,
} from '../../types/dtos';
import { AxiosError } from 'axios';

export const PredictionService = {
  /**
   * Get all predictions for the authenticated user
   */
  getAllPredictions: async (): Promise<PredictionDto[]> => {
    try {
      const response = await mainApiClient.get<PredictionDto[]>('/predictions');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get prediction by ID
   */
  getPredictionById: async (predictionId: number): Promise<PredictionDto> => {
    try {
      const response = await mainApiClient.get<PredictionDto>(`/predictions/${predictionId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Create a new prediction in the database
   */
  createPrediction: async (predictionData: CreatePredictionDto): Promise<PredictionDto> => {
    try {
      const response = await mainApiClient.post<PredictionDto>('/predictions', predictionData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Update an existing prediction
   */
  updatePrediction: async (
    predictionId: number,
    predictionData: Partial<CreatePredictionDto>
  ): Promise<void> => {
    try {
      await mainApiClient.put(`/predictions/${predictionId}`, predictionData);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Delete a prediction
   */
  deletePrediction: async (predictionId: number): Promise<void> => {
    try {
      await mainApiClient.delete(`/predictions/${predictionId}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get ML prediction from the prediction API
   * This calls the ML model to get heart disease prediction
   */
  getMlPrediction: async (predictionRequest: PredictionRequestDto): Promise<PredictionResponseDto> => {
    try {
      const response = await mlApiClient.post<PredictionResponseDto>('/api/prediction/predict', predictionRequest);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Train the ML model with new data
   */
  trainModel: async (): Promise<{ message: string }> => {
    try {
      const response = await mlApiClient.post<{ message: string }>('/api/prediction/train', {});
      return response.data;
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
