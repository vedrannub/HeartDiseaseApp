/**
 * Doctors Service
 * Handles doctor data operations
 */

import { mainApiClient } from './axiosClient';
import { DoctorDto } from '../../types/dtos';
import { AxiosError } from 'axios';

export const DoctorService = {
  /**
   * Get all doctors
   */
  getAllDoctors: async (): Promise<DoctorDto[]> => {
    try {
      const response = await mainApiClient.get<DoctorDto[]>('/doctors');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get doctor by ID
   */
  getDoctorById: async (doctorId: string): Promise<DoctorDto> => {
    try {
      const response = await mainApiClient.get<DoctorDto>(`/doctors/${doctorId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Create a new doctor
   */
  createDoctor: async (doctorData: DoctorDto): Promise<DoctorDto> => {
    try {
      const response = await mainApiClient.post<DoctorDto>('/doctors', doctorData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Update doctor information
   */
  updateDoctor: async (doctorId: string, doctorData: Partial<DoctorDto>): Promise<void> => {
    try {
      await mainApiClient.put(`/doctors/${doctorId}`, doctorData);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Delete a doctor
   */
  deleteDoctor: async (doctorId: string): Promise<void> => {
    try {
      await mainApiClient.delete(`/doctors/${doctorId}`);
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
