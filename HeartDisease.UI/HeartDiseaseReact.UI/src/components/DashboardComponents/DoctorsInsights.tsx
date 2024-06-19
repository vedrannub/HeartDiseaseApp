import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { Lightbulb as LightbulbIcon } from '@mui/icons-material';
import StyledCard from '../Common/StyledCard';// Adjust the path as needed


interface Insight {
  title: string;
  date: string;
  content: string;
}

const insights: Insight[] = [
  { title: 'Dietary Changes', date: '2024-06-10', content: 'Increase intake of fruits and vegetables.' },
  { title: 'Exercise Routine', date: '2024-05-25', content: 'Include 30 minutes of cardio daily.' },
  { title: 'Medication Adjustment', date: '2024-04-30', content: 'Reduce dosage of cholesterol medication.' },
];

const DoctorsInsights: React.FC = () => {
    return (
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Doctor’s Insights
          </Typography>
          <List>
            {insights.map((insight, index) => (
              <ListItem key={index} sx={{ borderBottom: '1px solid #eee', alignItems: 'flex-start' }}>
                <LightbulbIcon sx={{ color: 'yellow', marginRight: '10px' }} />
                <ListItemText
                  primary={<Typography variant="subtitle1">{insight.title}</Typography>}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        {insight.date}
                      </Typography>
                      {' — '}
                      <Typography component="span" variant="body2">
                        {insight.content}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </StyledCard>
    );
  };
  
  export default DoctorsInsights;