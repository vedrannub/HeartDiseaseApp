import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import MyPredictions from './pages/MyPredictions';
import MainLayout from './pages/MainLayout';
import { ROUTES } from './resources/routes-constants';
import './styles/main.sass';
import MyReports from './pages/MyReports';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from '../src/components/Common/ProtectedRoute';
import PublicRoute from '../src/components/Common/PublicRoute';
import MyAccount from '../src/pages/MyAccountPage';
import DoctorSuggestions from './pages/DoctorSuggestions';
import Appointments from './pages/Appointments';
import HealthData from './pages/HealthData';
import Messages from './pages/Messages';

const RootComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route 
          path={ROUTES.LOGIN_ROUTE} 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        <Route 
          path={ROUTES.REGISTER_ROUTE} 
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } 
        />
        <Route 
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
          <Route path={ROUTES.MY_PREDICTIONS} element={<MyPredictions />} />
          <Route path={ROUTES.MY_REPORTS} element={<MyReports />} />
          <Route path={ROUTES.MY_ACCOUNT} element={<MyAccount />} />
          <Route path={ROUTES.DOCTOR_SUGGESTIONS} element={<DoctorSuggestions />} />
          <Route path={ROUTES.APPOINTMENTS} element={<Appointments />} />
          <Route path={ROUTES.HEALTHDATA} element={<HealthData />} />
          <Route path={ROUTES.MESSAGES} element={<Messages />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default RootComponent;
