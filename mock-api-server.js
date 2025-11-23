/**
 * Mock API Server for testing UI integration
 * This server simulates the backend API responses for testing
 */

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock data
const mockPredictions = [
  {
    predictionId: 1,
    patientId: 'patient1',
    doctorId: 'doctor1',
    hasHeartDisease: false,
    predictionDate: new Date().toISOString(),
    dateAdded: new Date().toISOString(),
    age: 45,
    sex: 1,
    cp: 3,
    trestbps: 130,
    chol: 250,
    fbs: 1,
    restecg: 1,
    thalach: 150,
    exang: 0,
    oldpeak: 2.3,
    slope: 2,
    ca: 0,
    thal: 3,
    num: 0
  },
  {
    predictionId: 2,
    patientId: 'patient2',
    doctorId: 'doctor2',
    hasHeartDisease: true,
    predictionDate: new Date(Date.now() - 86400000).toISOString(),
    dateAdded: new Date(Date.now() - 86400000).toISOString(),
    age: 55,
    sex: 0,
    cp: 2,
    trestbps: 145,
    chol: 300,
    fbs: 1,
    restecg: 2,
    thalach: 130,
    exang: 1,
    oldpeak: 3.5,
    slope: 1,
    ca: 1,
    thal: 2,
    num: 2
  }
];

const mockDoctors = [
  { id: 'doctor1', name: 'Dr. John Smith' },
  { id: 'doctor2', name: 'Dr. Jane Doe' }
];

const mockPatients = [
  { id: 'patient1', name: 'John Patient', dateOfBirth: '1980-01-15' },
  { id: 'patient2', name: 'Jane Patient', dateOfBirth: '1970-05-20' }
];

let mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Authentication
app.post('/users/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  res.status(201).json({
    id: 'user_' + Date.now(),
    username: username || email,
    email,
    role: 'Patient'
  });
});

app.post('/users/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  if (email === 'admin@example.com' && password === 'Admin123!') {
    return res.json({ token: mockToken });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

app.delete('/users/:id', (req, res) => {
  res.json({ id: req.params.id, message: 'User deleted' });
});

// Predictions
app.get('/predictions', (req, res) => {
  res.json(mockPredictions);
});

app.get('/predictions/:id', (req, res) => {
  const prediction = mockPredictions.find(p => p.predictionId === parseInt(req.params.id));
  if (!prediction) {
    return res.status(404).json({ message: 'Prediction not found' });
  }
  res.json(prediction);
});

app.post('/predictions', (req, res) => {
  const newPrediction = {
    predictionId: mockPredictions.length + 1,
    ...req.body,
    predictionDate: new Date().toISOString(),
    dateAdded: new Date().toISOString()
  };
  mockPredictions.push(newPrediction);
  res.status(201).json(newPrediction);
});

app.put('/predictions/:id', (req, res) => {
  const index = mockPredictions.findIndex(p => p.predictionId === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Prediction not found' });
  }
  mockPredictions[index] = { ...mockPredictions[index], ...req.body };
  res.json(mockPredictions[index]);
});

app.delete('/predictions/:id', (req, res) => {
  const index = mockPredictions.findIndex(p => p.predictionId === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Prediction not found' });
  }
  const deleted = mockPredictions.splice(index, 1);
  res.json(deleted[0]);
});

// Patients
app.get('/patients/:id', (req, res) => {
  const patient = mockPatients.find(p => p.id === req.params.id);
  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }
  res.json(patient);
});

app.post('/patients', (req, res) => {
  const newPatient = {
    id: 'patient_' + Date.now(),
    ...req.body
  };
  mockPatients.push(newPatient);
  res.status(201).json(newPatient);
});

app.put('/patients/:id', (req, res) => {
  const index = mockPatients.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Patient not found' });
  }
  mockPatients[index] = { ...mockPatients[index], ...req.body };
  res.json(mockPatients[index]);
});

app.delete('/patients/:id', (req, res) => {
  const index = mockPatients.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Patient not found' });
  }
  const deleted = mockPatients.splice(index, 1);
  res.json(deleted[0]);
});

// Doctors
app.get('/doctors', (req, res) => {
  res.json(mockDoctors);
});

app.get('/doctors/:id', (req, res) => {
  const doctor = mockDoctors.find(d => d.id === req.params.id);
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }
  res.json(doctor);
});

app.post('/doctors', (req, res) => {
  const newDoctor = {
    id: 'doctor_' + Date.now(),
    ...req.body
  };
  mockDoctors.push(newDoctor);
  res.status(201).json(newDoctor);
});

app.put('/doctors/:id', (req, res) => {
  const index = mockDoctors.findIndex(d => d.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Doctor not found' });
  }
  mockDoctors[index] = { ...mockDoctors[index], ...req.body };
  res.json(mockDoctors[index]);
});

app.delete('/doctors/:id', (req, res) => {
  const index = mockDoctors.findIndex(d => d.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Doctor not found' });
  }
  const deleted = mockDoctors.splice(index, 1);
  res.json(deleted[0]);
});

// ML API endpoints
app.post('/api/prediction/predict', (req, res) => {
  const healthData = req.body;
  // Simple mock prediction based on some values
  const hasDisease = healthData.chol > 280 || healthData.trestbps > 140;
  res.json({
    predictionId: Date.now(),
    hasHeartDisease: hasDisease,
    confidence: 0.87,
    riskFactors: ['High cholesterol', 'Age over 50'],
    recommendations: ['Regular exercise', 'Dietary changes']
  });
});

app.post('/api/prediction/train', (req, res) => {
  res.json({ message: 'Model training started', status: 'Training' });
});

// Swagger-like endpoint
app.get('/swagger/v1/swagger.json', (req, res) => {
  res.json({
    openapi: '3.0.0',
    info: { title: 'Heart Disease API', version: '1.0' },
    paths: {
      '/predictions': {
        get: { summary: 'Get all predictions' },
        post: { summary: 'Create prediction' }
      }
    }
  });
});

// Swagger UI
app.get('/swagger', (req, res) => {
  res.send('<html><body><h1>Mock API Server Running</h1><p>Backend URL: http://localhost:5142</p></body></html>');
});

const PORT = process.env.PORT || 5142;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ╔════════════════════════════════════════════════╗
  ║                                                ║
  ║   ✅ Mock Backend API Server Running          ║
  ║                                                ║
  ║   Main API:      http://localhost:${PORT}      ║
  ║   Swagger:       http://localhost:${PORT}/swagger ║
  ║   Health Check:  http://localhost:${PORT}/health ║
  ║                                                ║
  ╚════════════════════════════════════════════════╝
  `);
});
