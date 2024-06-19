import React from 'react';
import { CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import StyledCard from '../Common/StyledCard'; // Adjust the path as needed

const predictionResults = [
  { factor: 'Age', value: 'Low Risk' },
  { factor: 'Cholesterol', value: 'Moderate Risk' },
  { factor: 'Blood Pressure', value: 'High Risk' },
  { factor: 'Smoking', value: 'Low Risk' },
];

const DetailedPredictionResults: React.FC = () => {
  return (
    <StyledCard  sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Detailed Prediction Results
        </Typography>
        <List>
          {predictionResults.map((result, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #eee' }}>
              <ListItemText
                primary={<Typography variant="subtitle1">{result.factor}</Typography>}
                secondary={<Typography variant="body2">{result.value}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </StyledCard>
  );
};

export default DetailedPredictionResults;
