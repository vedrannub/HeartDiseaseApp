# Heart Disease App - Complete Setup & Testing Guide

## Quick Start (3 steps)

### Step 1: Start Mock API Server (Terminal 1)
```bash
cd /workspaces/HeartDiseaseApp
node mock-api-server.js
```
✅ API runs on http://localhost:5142

### Step 2: Start React UI Dev Server (Terminal 2)
```bash
cd /workspaces/HeartDiseaseApp/HeartDisease.UI/HeartDiseaseReact.UI
npm start
```
✅ React UI runs on http://localhost:3000

### Step 3: Open in Browser
```bash
# Open http://localhost:3000 to test the application
```

---

## Complete Testing Workflow

### 1. Register New User
1. Go to **http://localhost:3000**
2. Click **"Register"** button
3. Fill in form:
   - Email: `test@example.com`
   - Password: `Test123!`
   - Confirm: `Test123!`
4. Click **"Register"** → Should redirect to login

### 2. Login User
1. Email: `admin@example.com` (or register your own)
2. Password: `Admin123!` (for predefined account)
3. Click **"Login"** → Should redirect to Dashboard

### 3. View Predictions
1. After login, click **"Predictions"** tab
2. Should see 2 existing predictions:
   - John's prediction (No Disease)
   - Jane's prediction (Has Disease)

### 4. Create New Prediction
1. Click **"New Prediction"** button
2. Fill form:
   - Age: 50
   - Sex: Male
   - Chest Pain: Typical Angina
   - Resting BP: 140
   - Cholesterol: 300
   - Other fields: Use defaults
3. Click **"Create"** → New prediction appears in list

### 5. Test ML Prediction
1. Click on any prediction
2. Click **"Get ML Prediction"**
3. Mock API returns simulated prediction based on health data

### 6. View Doctors
1. Click **"Doctors"** tab
2. See list of available doctors

---

## Architecture Verification

### Frontend Service Layer (TypeScript)
```
src/services/api/
├── axiosClient.ts       ✅ HTTP client with JWT injection
├── authService.ts       ✅ Register/Login/Logout
├── predictionService.ts ✅ CRUD predictions
├── patientService.ts    ✅ Patient operations
├── doctorService.ts     ✅ Doctor operations
└── index.ts             ✅ Exports
```

### Redux State Management
```
src/store/slices/
├── authSlice.ts         ✅ Authentication state
└── predictionsSlice.ts  ✅ Predictions state
```

### Type Definitions
```
src/types/dtos.ts        ✅ All TypeScript interfaces
```

### Environment Configuration
```
.env.development         ✅ Local API URLs
.env.production          ✅ Production API URLs
```

---

## API Endpoints Verified

### Authentication
- `POST /users/register` - Create new user
- `POST /users/login` - User login
- `DELETE /users/:id` - Delete user

### Predictions
- `GET /predictions` - Get all predictions
- `GET /predictions/:id` - Get specific prediction
- `POST /predictions` - Create prediction
- `PUT /predictions/:id` - Update prediction
- `DELETE /predictions/:id` - Delete prediction

### Patients
- `GET /patients/:id` - Get patient details
- `POST /patients` - Create patient
- `PUT /patients/:id` - Update patient
- `DELETE /patients/:id` - Delete patient

### Doctors
- `GET /doctors` - Get all doctors
- `GET /doctors/:id` - Get doctor details
- `POST /doctors` - Create doctor
- `PUT /doctors/:id` - Update doctor
- `DELETE /doctors/:id` - Delete doctor

### ML API
- `POST /api/prediction/predict` - Get ML prediction
- `POST /api/prediction/train` - Train model

---

## Testing Checklist

### ✅ API Communication
- [ ] Mock API server starts successfully
- [ ] React UI connects to API at http://localhost:5142
- [ ] API health check: `curl http://localhost:5142/health`
- [ ] Swagger UI available: http://localhost:5142/swagger

### ✅ Authentication Flow
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] JWT token stored in localStorage
- [ ] Logout clears token
- [ ] Protected routes require authentication

### ✅ Predictions CRUD
- [ ] Load predictions from API
- [ ] Create new prediction
- [ ] View prediction details
- [ ] Update existing prediction
- [ ] Delete prediction

### ✅ Patient Operations
- [ ] View patient information
- [ ] Create new patient
- [ ] Update patient data
- [ ] Delete patient

### ✅ Doctor Operations
- [ ] View all doctors
- [ ] Access doctor details
- [ ] Create/update/delete doctors

### ✅ ML Integration
- [ ] Submit health data to ML API
- [ ] Receive predictions
- [ ] Display results in UI

### ✅ Redux State
- [ ] State updates after API calls
- [ ] Error handling works
- [ ] Loading states display
- [ ] Logout clears auth state

---

## Production Deployment Notes

### Backend Replacement (When ready)
Replace the mock API server with the actual .NET backend:

```bash
# Kill mock server (Ctrl+C)
# Start actual API
cd /workspaces/HeartDiseaseApp/HeartDiseaseApplicationAPI
dotnet run --configuration Release
```

The UI will work seamlessly since it uses the same API contracts.

### Environment Configuration
Update `.env.production`:
```
REACT_APP_MAIN_API_URL=https://api.yourdomain.com
REACT_APP_ML_API_URL=https://ml.yourdomain.com
```

### Build for Production
```bash
cd HeartDiseaseReact.UI
npm run build
```

Output: `build/` directory ready for deployment

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 5142
lsof -i :5142
# Kill it
kill -9 <PID>
```

### CORS Issues
Mock server includes CORS middleware. If real backend needed:
```csharp
// In Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
```

### Authentication Issues
- Token format: Bearer {jwt_token}
- Token injected automatically by axios interceptor
- Check browser DevTools Network tab for Authorization header

### API Response Format
All responses use PascalCase (C# convention):
```json
{
  "predictionId": 1,
  "hasHeartDisease": false,
  "predictionDate": "2024-01-15T10:30:00Z"
}
```
Axios interceptor converts to camelCase for JavaScript.

---

## Next Steps After Testing

### 1. Fix Backend Database
```bash
# Apply EFCore migrations for SQLite
dotnet ef database update -p HeartDisease.Infrastructure
```

### 2. Integrate Real Backend
- Replace mock API server with actual .NET API
- Verify all endpoint responses match contracts
- Test with real database

### 3. Deploy ML API
- Start HeartDiseasePredictorAPI on port 5050
- Integrate prediction endpoints
- Test model training

### 4. Production Build
```bash
npm run build
# Deploy 'build' folder to CDN/web server
```

---

## Performance Notes

### React Bundle Size
- Uncompressed: 1,214 KB
- Gzipped: 350 KB
- Optimization opportunities:
  - Code split large components
  - Lazy load Redux slices
  - Optimize bundle with webpack

### API Response Times
Mock server responds instantly. Real backend may have:
- Database query delays
- ML prediction latency (could be seconds)
- Network latency

### Caching Strategy
- JWT tokens cached in localStorage
- Predictions cached in Redux
- Consider implementing react-query for advanced caching

---

## Contact & Support

For issues with:
- **React UI**: Check browser console for errors
- **API Communication**: Check Network tab in DevTools
- **State Management**: Use Redux DevTools extension
- **Backend**: Check server logs in terminal

---

**Status**: ✅ System Ready for Testing
**Last Updated**: 2024
**Version**: 1.0
