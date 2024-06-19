import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import MyPredictions from './pages/MyPredictions'
import MainLayout from './pages/MainLayout';
import { ROUTES } from './resources/routes-constants'
import './styles/main.sass'
import MyReports from './pages/MyReports'

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
            <Route path={ROUTES.LOGIN_ROUTE} element={<LoginPage />} />
                <Route element={<MainLayout />}>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
                    <Route path={ROUTES.MY_PREDICTIONS} element={<MyPredictions />} />
                    <Route path={ROUTES.MY_REPORTS} element={<MyReports />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default RootComponent
