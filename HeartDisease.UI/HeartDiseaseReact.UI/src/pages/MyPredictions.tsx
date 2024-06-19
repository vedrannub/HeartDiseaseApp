import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import PredictionSummary from '../components/MyPredictionsComponents/PredictionSummary'
import DetailedPredictionResults from '../components/MyPredictionsComponents/DetailedPredictionResults';
import HistoricalPredictions from '../components/MyPredictionsComponents/HistoricalPredictions';
import RiskFactorBreakdown from '../components/MyPredictionsComponents/RiskFactorBreakdown';
import LifestyleRecommendations from '../components/MyPredictionsComponents/LifestyleRecommendations';
import ComparisonWithPeerGroup from '../components/MyPredictionsComponents/ComparisonWithPeerGroup';

export default function MyPredictions () {
    return (
      <Box sx={{ flexGrow: 1, p: 2, marginTop: '8px' }}>
        <Typography variant="h4" gutterBottom>
          My Predictions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PredictionSummary />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailedPredictionResults />
          </Grid>
          <Grid item xs={12} md={6}>
            <HistoricalPredictions />
          </Grid>
          <Grid item xs={12} md={6}>
            <RiskFactorBreakdown />
          </Grid>
          <Grid item xs={12} md={6}>
            <LifestyleRecommendations />
          </Grid>
          <Grid item xs={12}>
            <ComparisonWithPeerGroup />
          </Grid>
        </Grid>
      </Box>
    );
  };
  