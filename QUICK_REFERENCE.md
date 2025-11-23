# Quick Reference - Heart Disease App

## 🚀 Running Services

**Mock API Server (Port 5142)**
```bash
cd /workspaces/HeartDiseaseApp
node mock-api-server.js
```

**React UI Server (Port 3000)**
```bash
cd /workspaces/HeartDiseaseApp/HeartDisease.UI/HeartDiseaseReact.UI
npm start
```

**All Services**
```bash
cd /workspaces/HeartDiseaseApp
./start-all.sh
```

---

## 🔗 URLs

| Service | URL | Purpose |
|---------|-----|---------|
| React UI | http://localhost:3000 | Main application |
| Mock API | http://localhost:5142 | Backend API |
| API Health | http://localhost:5142/health | Service status |
| Swagger UI | http://localhost:5142/swagger | API documentation |
| Predictions | http://localhost:5142/predictions | API data |

---

## 👤 Test Login Credentials

| Field | Value |
|-------|-------|
| Email | admin@example.com |
| Password | Admin123! |

Or register a new account on the registration page.

---

## 📁 Project Structure

```
HeartDiseaseApp/
├── mock-api-server.js          ← Mock backend
├── start-all.sh                ← Start all services
├── TESTING_GUIDE.md            ← Testing workflow
├── SETUP_COMPLETE.md           ← This complete guide
├── HeartDiseaseReact.UI/       ← React frontend
│   ├── src/
│   │   ├── services/api/       ← API clients
│   │   │   ├── axiosClient.ts
│   │   │   ├── authService.ts
│   │   │   ├── predictionService.ts
│   │   │   └── ...
│   │   ├── store/
│   │   │   ├── slices/         ← Redux slices
│   │   │   │   ├── authSlice.ts
│   │   │   │   └── predictionsSlice.ts
│   │   │   └── store.ts
│   │   ├── types/
│   │   │   └── dtos.ts         ← TypeScript interfaces
│   │   └── components/         ← React components
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
└── HeartDiseaseApplicationAPI/ ← .NET backend (for later)
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Body |
|--------|----------|------|
| POST | /users/register | {email, password} |
| POST | /users/login | {email, password} |
| DELETE | /users/:id | - |

### Predictions
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /predictions | Get all |
| GET | /predictions/:id | Get one |
| POST | /predictions | Create |
| PUT | /predictions/:id | Update |
| DELETE | /predictions/:id | Delete |

### ML Prediction
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/prediction/predict | Get prediction |
| POST | /api/prediction/train | Train model |

### Patients & Doctors
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /patients/:id | Get patient |
| GET | /doctors | Get all doctors |
| GET | /doctors/:id | Get doctor |
| POST | /patients | Create patient |
| POST | /doctors | Create doctor |
| PUT | /patients/:id | Update patient |
| PUT | /doctors/:id | Update doctor |
| DELETE | /patients/:id | Delete patient |
| DELETE | /doctors/:id | Delete doctor |

---

## 🎯 Testing Workflow

### 1. Login
```
→ Go to http://localhost:3000
→ Enter email: admin@example.com
→ Enter password: Admin123!
→ Click Login
```

### 2. View Dashboard
```
→ See Predictions tab
→ See Doctors tab
→ See current user info
```

### 3. View Predictions
```
→ Click "Predictions" tab
→ See 2 existing predictions
→ Each shows patient data + prediction
```

### 4. Create Prediction
```
→ Click "New Prediction"
→ Fill form (age, sex, BP, cholesterol, etc.)
→ Click "Create"
→ See new prediction in list
```

### 5. ML Prediction
```
→ Click on any prediction
→ Click "Get ML Prediction"
→ See simulated ML result with confidence
```

### 6. Logout
```
→ Click "Logout" button
→ Redirected to login page
→ Token cleared from localStorage
```

---

## 🛠️ Development Commands

### Install Dependencies
```bash
# React UI
cd HeartDiseaseApp/HeartDisease.UI/HeartDiseaseReact.UI
npm install

# Mock server already has dependencies installed
```

### Build React UI
```bash
npm run build
# Output: build/ directory
```

### Run Tests
```bash
npm test
```

### Check for Errors
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

---

## 📊 Key Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| UI Framework | React 18 | User interface |
| State Mgmt | Redux Toolkit | Global state |
| HTTP Client | Axios | API communication |
| Type System | TypeScript | Type safety |
| Build Tool | Vite | Fast build |
| Backend | Express.js | Mock API |
| Styling | Sass | CSS preprocessing |

---

## 🔐 Security Features

- ✅ JWT token authentication
- ✅ Automatic token injection in headers
- ✅ CORS enabled for localhost
- ✅ Error handling for auth failures
- ✅ Protected routes (requires login)
- ✅ Token cleanup on logout
- ✅ LocalStorage for token persistence

---

## ⚡ Performance Tips

### Optimize Bundle
```bash
# Code splitting
npm run build -- --analyze

# Check bundle size
npm run build
```

### Cache Strategy
```typescript
// Use Redux for client-side caching
// Implement pagination for large lists
// Use React.memo for expensive components
```

### Network Optimization
```typescript
// API requests are debounced
// JWT token cached in localStorage
// Axios interceptors handle retries
```

---

## 🐛 Common Issues

### "Port already in use"
```bash
lsof -i :5142    # Find process
kill -9 <PID>    # Kill it
```

### "CORS error"
Mock server handles CORS. Real backend needs:
```csharp
builder.Services.AddCors(...);
app.UseCors("AllowAll");
```

### "Token not injecting"
Check browser DevTools → Network → Authorization header should contain "Bearer <token>"

### "Predictions not loading"
1. Check API is running: `curl http://localhost:5142/predictions`
2. Check Redux DevTools for state
3. Check browser console for errors

---

## 📚 Documentation

- **TESTING_GUIDE.md** - Complete testing manual
- **SETUP_COMPLETE.md** - Full setup documentation  
- **API_INTEGRATION.md** - Detailed API docs
- **mock-api-server.js** - API implementation
- **Quick Reference Card** - This file!

---

## ✅ Verification Commands

```bash
# Check API Health
curl http://localhost:5142/health

# Get all predictions
curl http://localhost:5142/predictions

# Login to get token
curl -X POST http://localhost:5142/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin123!"}'

# Check React is running
curl http://localhost:3000
```

---

## 🎯 Next Steps

1. **Test the UI** at http://localhost:3000
2. **Try all CRUD operations** on predictions
3. **Test authentication flow** (login/logout)
4. **Check Redux DevTools** for state management
5. **Inspect Network tab** for API calls
6. **Ready to migrate** to real .NET backend

---

**Status:** ✅ Complete & Running  
**Last Updated:** 2024  
**Version:** 1.0
