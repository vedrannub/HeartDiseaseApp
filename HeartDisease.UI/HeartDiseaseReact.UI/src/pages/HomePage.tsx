import React from 'react';
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HealthSummary from '~/components/DashboardComponents/HealthSummary';
import RiskAssessment from '~/components/DashboardComponents/RiskAssesment';
import PredictionResults from '~/components/DashboardComponents/PredictionResults';
import HistoricalDataAndTrends from '~/components/DashboardComponents/HistoricalDataAndTrends';
import DoctorsInsights from '~/components/DashboardComponents/DoctorsInsights';
import LatestReports from '~/components/DashboardComponents/LatestReports';
import UpcomingAppointments from '~/components/DashboardComponents/UpcomingAppointments';
import Notifications from '~/components/DashboardComponents/Notifications';
import HealthTips from '~/components/DashboardComponents/HealthTipsComponent';
import TreatmentPlan from '~/components/DashboardComponents/TreatmentPlan';
import CurrentMedications from '~/components/DashboardComponents/CurrentMedications';
const HomePage: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <HealthSummary />
      </Grid>
      <Grid item xs={12} md={8}>
        <RiskAssessment />
      </Grid>
      <Grid item xs={12} md={4}>
        <PredictionResults />
      </Grid>
      <Grid item xs={12} md={12}>
        <HistoricalDataAndTrends />
      </Grid>
      <Grid item xs={12} md={4}>
        <LatestReports />
      </Grid>
      <Grid item xs={12} md={4}>
        <DoctorsInsights />
      </Grid>
      <Grid item xs={12} md={4}>
        <UpcomingAppointments />
      </Grid>
      <Grid item xs={12} md={3}>
        <Notifications />
      </Grid>
      <Grid item xs={12} md={3}>
        <HealthTips />
      </Grid>
      <Grid item xs={12} md={3}>
        <TreatmentPlan />
      </Grid>
      <Grid item xs={12} md={3}>
        <CurrentMedications />
      </Grid>
    </Grid>
  );
};

export default HomePage;
