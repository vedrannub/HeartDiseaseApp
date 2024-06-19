import React from 'react';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

interface PredictionResult {
  factor: string;
  value: string;
  impact: string;
}

const predictionResults: PredictionResult[] = [
  { factor: 'Age', value: '45', impact: 'High' },
  { factor: 'Blood Pressure', value: '140/90 mmHg', impact: 'Medium' },
  { factor: 'Cholesterol', value: '220 mg/dL', impact: 'High' },
  { factor: 'Smoking', value: 'Yes', impact: 'High' },
  { factor: 'Physical Activity', value: 'Low', impact: 'Medium' },
];

const PredictionResults: React.FC = () => {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Prediction Results
        </Typography>
        <List>
          {predictionResults.map((result, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #eee' }}>
              <ListItemText
                primary={result.factor}
                secondary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{result.value}</span>
                    <span>{result.impact}</span>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default PredictionResults;
