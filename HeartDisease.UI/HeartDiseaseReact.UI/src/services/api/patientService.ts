/**
 * Patients Service
 * Handles patient data CRUD operations
 */

import { mainApiClient } from './axiosClient';
import { PatientDto } from '../../types/dtos';
import { AxiosError } from 'axios';

export const PatientService = {
  /**
   * Get patient by ID
   */
  getPatientById: async (patientId: string): Promise<PatientDto> => {
    try {
      const response = await mainApiClient.get<PatientDto>(`/patients/${patientId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Create a new patient
   */
  createPatient: async (patientData: PatientDto): Promise<PatientDto> => {
    try {
      const response = await mainApiClient.post<PatientDto>('/patients', patientData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Update patient information
   */
  updatePatient: async (patientId: string, patientData: Partial<PatientDto>): Promise<void> => {
    try {
      await mainApiClient.put(`/patients/${patientId}`, patientData);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Delete a patient
   */
  deletePatient: async (patientId: string): Promise<void> => {
    try {
      await mainApiClient.delete(`/patients/${patientId}`);
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
