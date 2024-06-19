import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import StyledCard from '../Common/StyledCard';
import { Healing as HealingIcon } from '@mui/icons-material';



interface Treatment {
  description: string;
  startDate: string;
  progress: string;
}

const treatments: Treatment[] = [
  { description: 'Start cholesterol-lowering medication.', startDate: '2024-06-01', progress: 'Ongoing' },
  { description: 'Begin daily 30-minute walks.', startDate: '2024-06-05', progress: 'Ongoing' },
  { description: 'Reduce sodium intake.', startDate: '2024-06-10', progress: 'Ongoing' },
];

const TreatmentPlan: React.FC = () => {
    return (
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Treatment Plan
          </Typography>
          <List>
            {treatments.map((treatment, index) => (
              <ListItem key={index} sx={{ borderBottom: '1px solid #eee', alignItems: 'flex-start' }}>
                <HealingIcon sx={{ color: 'purple', marginRight: '10px' }} />
                <ListItemText
                  primary={<Typography variant="subtitle1">{treatment.description}</Typography>}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        {treatment.startDate}
                      </Typography>
                      {' — '}
                      <Typography component="span" variant="body2">
                        {treatment.progress}
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
  
  export default TreatmentPlan;
