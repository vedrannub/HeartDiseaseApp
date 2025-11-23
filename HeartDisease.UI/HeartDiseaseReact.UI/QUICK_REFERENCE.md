# Quick Reference Card

## Services

### AuthService
```typescript
import { AuthService } from '@/services/api'

AuthService.register(userData)           // Promise<UserProfileDto>
AuthService.login(credentials)           // Promise<string> (token)
AuthService.logout()                     // void
AuthService.isAuthenticated()            // boolean
AuthService.getToken()                   // string | null
AuthService.deleteUser(userId)           // Promise<void>
```

### PredictionService
```typescript
import { PredictionService } from '@/services/api'

PredictionService.getAllPredictions()    // Promise<PredictionDto[]>
PredictionService.getPredictionById(id)  // Promise<PredictionDto>
PredictionService.createPrediction(data) // Promise<PredictionDto>
PredictionService.updatePrediction(id, data) // Promise<void>
PredictionService.deletePrediction(id)   // Promise<void>
PredictionService.getMlPrediction(data)  // Promise<PredictionResponseDto>
PredictionService.trainModel()           // Promise<{ message: string }>
```

### PatientService
```typescript
import { PatientService } from '@/services/api'

PatientService.getPatientById(id)        // Promise<PatientDto>
PatientService.createPatient(data)       // Promise<PatientDto>
PatientService.updatePatient(id, data)   // Promise<void>
PatientService.deletePatient(id)         // Promise<void>
```

### DoctorService
```typescript
import { DoctorService } from '@/services/api'

DoctorService.getAllDoctors()            // Promise<DoctorDto[]>
DoctorService.getDoctorById(id)          // Promise<DoctorDto>
DoctorService.createDoctor(data)         // Promise<DoctorDto>
DoctorService.updateDoctor(id, data)     // Promise<void>
DoctorService.deleteDoctor(id)           // Promise<void>
```

## Redux Hooks

```typescript
import { useAppDispatch, useAppSelector } from '@/store/reducers/store'
import { login, logout, clearError } from '@/store/slices/authSlice'
import { fetchAllPredictions, createNewPrediction, clearError } from '@/store/slices/predictionsSlice'

// Get state
const authState = useAppSelector(state => state.auth)
const predictionsState = useAppSelector(state => state.predictions)

// Dispatch actions
const dispatch = useAppDispatch()
await dispatch(login({ email, password }))
await dispatch(logout())
await dispatch(fetchAllPredictions())
```

## Component Patterns

### Authentication Pattern
```typescript
const dispatch = useAppDispatch()
const { isAuthenticated, loading, error } = useAppSelector(state => state.auth)

const handleLogin = async (credentials) => {
  try {
    await dispatch(login(credentials)).unwrap()
    navigate('/dashboard')
  } catch (err) {
    // Error in Redux state
  }
}
```

### Data Fetching Pattern
```typescript
const dispatch = useAppDispatch()
const { predictions, loading, error } = useAppSelector(state => state.predictions)

useEffect(() => {
  dispatch(fetchAllPredictions())
}, [dispatch])

return loading ? <Spinner /> : <Table data={predictions} />
```

### Error Handling Pattern
```typescript
const { error } = useAppSelector(state => state.predictions)

return error ? (
  <Alert severity="error" onClose={() => dispatch(clearError())}>
    {error}
  </Alert>
) : null
```

## Environment Variables

```bash
# .env.development or .env.production
REACT_APP_MAIN_API_URL=http://localhost:5142
REACT_APP_ML_API_URL=http://localhost:5050
REACT_APP_ENV=development
```

## API Endpoints

### Main API (http://localhost:5142)
```
POST   /users/register          - Register user
POST   /users/login             - Login user
DELETE /users/{id}              - Delete user
GET    /patients/{id}           - Get patient
POST   /patients                - Create patient
PUT    /patients/{id}           - Update patient
DELETE /patients/{id}           - Delete patient
GET    /predictions             - List predictions
GET    /predictions/{id}        - Get prediction
POST   /predictions             - Create prediction
PUT    /predictions/{id}        - Update prediction
DELETE /predictions/{id}        - Delete prediction
GET    /doctors                 - List doctors
GET    /doctors/{id}            - Get doctor
POST   /doctors                 - Create doctor
PUT    /doctors/{id}            - Update doctor
DELETE /doctors/{id}            - Delete doctor
```

### ML API (http://localhost:5050)
```
POST   /api/prediction/predict  - Get ML prediction
POST   /api/prediction/train    - Train model
```

## Type Definitions

```typescript
// From src/types/dtos.ts

interface RegisterUserDto {
  username: string
  email: string
  password: string
}

interface LoginUserDto {
  email: string
  password: string
}

interface PatientDto {
  id: string
  name: string
  dateOfBirth: string
}

interface PredictionDto {
  predictionId: number
  patientId: string
  doctorId: string
  hasHeartDisease: boolean
  predictionDate: string
  dateAdded: string
  age: number
  sex: number
  cp: number
  trestbps: number
  chol: number
  fbs: number
  restecg: number
  thalach: number
  exang: number
  oldpeak: number
  slope: number
  ca: number
  thal: number
  num: number
  patient?: PatientDto
  doctor?: DoctorDto
}

interface DoctorDto {
  id: string
  name: string
}
```

## Common Imports

```typescript
// Services
import { AuthService, PredictionService, PatientService, DoctorService } from '@/services/api'

// Redux
import { useAppDispatch, useAppSelector } from '@/store/reducers/store'
import { login, logout } from '@/store/slices/authSlice'
import { fetchAllPredictions, createNewPrediction } from '@/store/slices/predictionsSlice'

// Types
import { 
  PredictionDto, 
  PatientDto, 
  DoctorDto,
  LoginUserDto,
  RegisterUserDto 
} from '@/types/dtos'
```

## Debugging Commands

```typescript
// Browser console

// Check Redux state
import store from '@/store/reducers/store'
console.log(store.getState())

// Test service directly
import { PredictionService } from '@/services/api'
await PredictionService.getAllPredictions()

// Check token
console.log(localStorage.getItem('authToken'))

// Test API request
import { mainApiClient } from '@/services/api'
await mainApiClient.get('/predictions')
```

## File Locations

```
Services:        src/services/api/
Redux State:     src/store/slices/
Types/DTOs:      src/types/dtos.ts
Components:      src/components/
Pages:           src/pages/
Configuration:   .env.development, .env.production
Documentation:   API_INTEGRATION.md, MIGRATION_GUIDE.md
```

## Useful Commands

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test

# Check linting
npm run lint

# Format code
npm run format
```

## Quick Fixes

### Token not persisting?
- Check localStorage: `localStorage.getItem('authToken')`
- Verify auth reducer is in persistConfig whitelist

### CORS error?
- Check REACT_APP_MAIN_API_URL in .env
- Verify backend CORS policy

### API returns 401?
- Token might be expired
- Check if login successful and token was saved
- Verify Authorization header is being sent

### Data not showing?
- Check Redux state with Redux DevTools
- Verify dispatch is in useEffect dependency array
- Check network tab for API response

### Build errors?
- Check TypeScript errors: `npx tsc --noEmit`
- Check imports and file paths
- Verify environment variables are set
