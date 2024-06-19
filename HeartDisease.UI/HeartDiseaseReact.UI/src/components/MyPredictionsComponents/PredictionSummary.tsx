import React from 'react';
import { CardContent, Typography } from '@mui/material';
import StyledCard from '~/components/Common/StyledCard'; // Adjust the path as needed

const PredictionSummary: React.FC = () => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Prediction Summary
        </Typography>
        <Typography variant="body1">
          Based on the latest analysis, you are currently at low risk of heart disease.
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default PredictionSummary;
