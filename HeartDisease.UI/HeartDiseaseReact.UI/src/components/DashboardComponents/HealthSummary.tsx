import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import {
  Favorite as FavoriteIcon,
  Opacity as OpacityIcon,
  Height as HeightIcon,
  LocalHospital as LocalHospitalIcon,
  MonitorHeart as MonitorHeartIcon,
} from '@mui/icons-material';

type HealthMetricColor = 'primary' | 'secondary' | 'error' | 'warning' | 'success';

interface HealthMetric {
  label: string;
  value: string;
  icon: React.ReactElement;
  color: HealthMetricColor;
}

const healthMetrics: HealthMetric[] = [
  { label: 'Blood Pressure', value: '120/80 mmHg', icon: <OpacityIcon />, color: 'primary' },
  { label: 'Cholesterol', value: '190 mg/dL', icon: <LocalHospitalIcon />, color: 'secondary' },
  { label: 'Heart Rate', value: '72 bpm', icon: <FavoriteIcon />, color: 'error' },
  { label: 'Blood Sugar', value: '90 mg/dL', icon: <MonitorHeartIcon />, color: 'warning' },
  { label: 'BMI', value: '22.5 kg/m²', icon: <HeightIcon />, color: 'success' },
];

const HealthSummary: React.FC = () => {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Health Summary
        </Typography>
        <Grid container spacing={2}>
          {healthMetrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 1,
                  borderRadius: 1,
                  bgcolor: (theme) => theme.palette[metric.color].light,
                  color: (theme) => theme.palette[metric.color].contrastText,
                }}
              >
                {metric.icon}
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body1">{metric.label}</Typography>
                  <Typography variant="h6">{metric.value}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HealthSummary;
