# Heart Disease Prediction - UI API Integration

This document outlines the updated API architecture and integration patterns for the Heart Disease Prediction React UI.

## Architecture Overview

The UI is now organized with a clean separation of concerns:

- **API Services** (`src/services/api/`): Centralized Axios instances and service modules for each resource
- **Redux Store** (`src/store/`): Manages application state with async thunks
- **Types** (`src/types/`): TypeScript DTOs matching backend contracts
- **Components**: Consumer of Redux state and dispatchers of actions

## API Endpoints

### Main Backend API (HeartDiseaseApplicationAPI)
Base URL: `http://localhost:5142` (configurable via `REACT_APP_MAIN_API_URL`)

#### Authentication
- `POST /users/register` - Register new user
- `POST /users/login` - Login and get JWT token
- `DELETE /users/{id}` - Delete user account

#### Patients
- `GET /patients/{id}` - Get patient by ID
- `POST /patients` - Create new patient
- `PUT /patients/{id}` - Update patient
- `DELETE /patients/{id}` - Delete patient

#### Predictions
- `GET /predictions` - Get all predictions
- `GET /predictions/{id}` - Get prediction by ID
- `POST /predictions` - Create new prediction
- `PUT /predictions/{id}` - Update prediction
- `DELETE /predictions/{id}` - Delete prediction

#### Doctors
- `GET /doctors` - Get all doctors
- `GET /doctors/{id}` - Get doctor by ID
- `POST /doctors` - Create new doctor
- `PUT /doctors/{id}` - Update doctor
- `DELETE /doctors/{id}` - Delete doctor

### ML Predictor API (HeartDiseasePredictorAPI)
Base URL: `http://localhost:5050` (configurable via `REACT_APP_ML_API_URL`)

- `POST /api/prediction/predict` - Get ML prediction
- `POST /api/prediction/train` - Train the model

## Service Usage

### Authentication Service

```typescript
import { AuthService } from '@/services/api';

// Register
await AuthService.register({ username, email, password });

// Login
const token = await AuthService.login({ email, password });

// Check authentication
if (AuthService.isAuthenticated()) { ... }

// Logout
AuthService.logout();
```

### Prediction Service

```typescript
import { PredictionService } from '@/services/api';

// Get all predictions
const predictions = await PredictionService.getAllPredictions();

// Get specific prediction
const prediction = await PredictionService.getPredictionById(1);

// Create prediction
const newPrediction = await PredictionService.createPrediction({
  patientId: 'patient123',
  doctorId: 'doctor456',
  hasHeartDisease: false,
  age: 45,
  // ... other health data
});

// Get ML prediction
const mlPrediction = await PredictionService.getMlPrediction({
  patientId: 'patient123',
  doctorId: 'doctor456',
  age: 45,
  // ... other health data
});
```

### Patient Service

```typescript
import { PatientService } from '@/services/api';

// Get patient
const patient = await PatientService.getPatientById('patient123');

// Create patient
const newPatient = await PatientService.createPatient({
  id: 'patient123',
  name: 'John Doe',
  dateOfBirth: '1980-01-15'
});

// Update patient
await PatientService.updatePatient('patient123', { name: 'Jane Doe' });

// Delete patient
await PatientService.deletePatient('patient123');
```

### Doctor Service

```typescript
import { DoctorService } from '@/services/api';

// Get all doctors
const doctors = await DoctorService.getAllDoctors();

// Get specific doctor
const doctor = await DoctorService.getDoctorById('doctor456');
```

## Redux Usage

### Authentication State

```typescript
import { useAppDispatch, useAppSelector } from '@/store/reducers/store';
import { login, logout } from '@/store/slices/authSlice';

export function LoginComponent() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, error } = useAppSelector(state => state.auth);

  const handleLogin = async (credentials) => {
    await dispatch(login(credentials));
  };

  // ... rest of component
}
```

### Predictions State

```typescript
import { useAppDispatch, useAppSelector } from '@/store/reducers/store';
import { fetchAllPredictions, createNewPrediction } from '@/store/slices/predictionsSlice';

export function PredictionsComponent() {
  const dispatch = useAppDispatch();
  const { predictions, loading, error } = useAppSelector(state => state.predictions);

  useEffect(() => {
    dispatch(fetchAllPredictions());
  }, [dispatch]);

  // ... rest of component
}
```

## Environment Configuration

Create `.env.development` and `.env.production` files with:

```env
REACT_APP_MAIN_API_URL=http://localhost:5142
REACT_APP_ML_API_URL=http://localhost:5050
REACT_APP_ENV=development
```

## Request/Response Transformation

Axios interceptors automatically handle:
- **Request**: Converting camelCase to snake_case (C# convention)
- **Response**: Converting snake_case to camelCase (JavaScript convention)
- **Authentication**: Adding JWT token to all requests
- **Error Handling**: Automatic token refresh and redirect to login on 401

## Error Handling

All service methods throw errors on failure:

```typescript
try {
  const prediction = await PredictionService.getPredictionById(1);
} catch (error) {
  console.error(error.message);
}
```

Redux thunks automatically handle errors and store them in state:

```typescript
const { error } = useAppSelector(state => state.predictions);
if (error) {
  showErrorNotification(error);
}
```

## Data Flow

1. Component dispatches Redux action (async thunk)
2. Thunk calls API service method
3. Service method makes HTTP request via Axios
4. Axios interceptors handle transformations and auth
5. Response is transformed and returned
6. Redux state is updated
7. Component re-renders with new state

## Migration Guide

### Old Code
```typescript
// Old approach with custom axios
import axios from 'axios';
const response = await axios.get('/predictions');
```

### New Code
```typescript
// New approach with services
import { PredictionService } from '@/services/api';
const predictions = await PredictionService.getAllPredictions();

// Or with Redux
const predictions = useAppSelector(state => state.predictions.predictions);
```

## Best Practices

1. **Use Redux for global state**: Authentication, predictions, user data
2. **Use services for API calls**: Keep logic centralized and testable
3. **Handle errors in Redux**: Error state is available to all components
4. **Type everything**: Use DTOs and TypeScript interfaces
5. **Avoid direct axios calls**: Always use service methods
6. **Clean up subscriptions**: Use useEffect cleanup functions

## CORS Configuration

The backend API allows requests from `http://127.0.0.1:3000`. Update `appsettings.json` if needed:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://127.0.0.1:3000")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});
```

## Future Improvements

- Add request caching layer
- Implement retry logic for failed requests
- Add request timeout and abort functionality
- Add request/response logging for debugging
- Implement subscription pattern for real-time updates
- Add mock API responses for development
