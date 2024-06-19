import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { TipsAndUpdates as TipsAndUpdatesIcon } from '@mui/icons-material';
import StyledCard from '../Common/StyledCard';


interface HealthTip {
    tip: string;
    date: string;
  }
  
  const healthTips: HealthTip[] = [
    { tip: 'Drink at least 8 glasses of water a day.', date: '2024-06-15' },
    { tip: 'Take a 30-minute walk daily.', date: '2024-06-16' },
    { tip: 'Eat more fruits and vegetables.', date: '2024-06-17' },
  ];


  const HealthTips: React.FC = () => {
    return (
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Health Tips
          </Typography>
          <List>
            {healthTips.map((tip, index) => (
              <ListItem key={index} sx={{ borderBottom: '1px solid #eee', alignItems: 'flex-start' }}>
                <TipsAndUpdatesIcon sx={{ color: 'blue', marginRight: '10px' }} />
                <ListItemText
                  primary={<Typography variant="subtitle1">{tip.tip}</Typography>}
                  secondary={<Typography variant="body2">{tip.date}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </StyledCard>
    );
  };
  
  export default HealthTips;
