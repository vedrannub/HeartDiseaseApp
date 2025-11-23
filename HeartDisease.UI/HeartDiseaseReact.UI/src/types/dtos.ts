/**
 * Data Transfer Objects (DTOs) matching backend API contracts
 * Aligned with HeartDiseaseApplicationAPI
 */

export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
}

export interface PatientDto {
  id: string;
  name: string;
  dateOfBirth: string; // ISO 8601 format
}

export interface DoctorDto {
  id: string;
  name: string;
}

export interface PredictionDto {
  predictionId: number;
  patientId: string;
  doctorId: string;
  hasHeartDisease: boolean;
  predictionDate: string; // ISO 8601 format
  dateAdded: string; // ISO 8601 format
  age: number;
  sex: number;
  cp: number;
  trestbps: number;
  chol: number;
  fbs: number;
  restecg: number;
  thalach: number;
  exang: number;
  oldpeak: number;
  slope: number;
  ca: number;
  thal: number;
  num: number;
  patient?: PatientDto;
  doctor?: DoctorDto;
}

export interface CreatePredictionDto {
  patientId: string;
  doctorId: string;
  hasHeartDisease: boolean;
  age: number;
  sex: number;
  cp: number;
  trestbps: number;
  chol: number;
  fbs: number;
  restecg: number;
  thalach: number;
  exang: number;
  oldpeak: number;
  slope: number;
  ca: number;
  thal: number;
  num: number;
}

// Health data for risk assessment
export interface HealthDataDto {
  age: number;
  sex: number;
  cp: number; // Chest pain type
  trestbps: number; // Resting blood pressure
  chol: number; // Serum cholesterol
  fbs: number; // Fasting blood sugar
  restecg: number; // Resting electrocardiographic results
  thalach: number; // Maximum heart rate achieved
  exang: number; // Exercise induced angina
  oldpeak: number; // ST depression induced by exercise
  slope: number; // Slope of the ST segment
  ca: number; // Number of major vessels
  thal: number; // Thalassemia
}

// Prediction request to ML API
export interface PredictionRequestDto extends HealthDataDto {
  patientId: string;
  doctorId: string;
}

// Prediction response from ML API
export interface PredictionResponseDto {
  predictionId: number;
  hasHeartDisease: boolean;
  confidence: number;
  riskFactors: string[];
  recommendations: string[];
}

// Error response
export interface ErrorResponseDto {
  message: string;
  details?: string;
  errors?: Record<string, string[]>;
}

// User profile
export interface UserProfileDto {
  id: string;
  username: string;
  email: string;
  role: string;
}
