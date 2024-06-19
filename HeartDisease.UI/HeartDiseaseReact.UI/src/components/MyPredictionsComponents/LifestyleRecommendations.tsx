import React from 'react';
import { CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import StyledCard from '~/components/Common/StyledCard'; // Adjust the path as needed

const recommendations = [
  { advice: 'Exercise', details: 'Engage in 30 minutes of moderate exercise daily.' },
  { advice: 'Diet', details: 'Increase intake of fruits and vegetables.' },
  { advice: 'Smoking', details: 'Quit smoking to reduce risk significantly.' },
  { advice: 'Medication', details: 'Take prescribed medication as directed.' },
];

const LifestyleRecommendations: React.FC = () => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Lifestyle Recommendations
        </Typography>
        <List>
          {recommendations.map((recommendation, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #eee' }}>
              <ListItemText
                primary={<Typography variant="subtitle1">{recommendation.advice}</Typography>}
                secondary={<Typography variant="body2">{recommendation.details}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </StyledCard>
  );
};

export default LifestyleRecommendations;
