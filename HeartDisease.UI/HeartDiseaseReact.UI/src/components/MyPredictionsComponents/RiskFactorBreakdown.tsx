import React from 'react';
import { CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import StyledCard from '~/components/Common/StyledCard'; // Adjust the path as needed

const riskFactors = [
  { factor: 'Blood Pressure', description: 'High blood pressure is a significant risk factor for heart disease.' },
  { factor: 'Cholesterol', description: 'High cholesterol levels increase the risk of heart disease.' },
  { factor: 'Age', description: 'Older age is associated with higher risk.' },
  { factor: 'Smoking', description: 'Smoking greatly increases the risk of heart disease.' },
];

const RiskFactorBreakdown: React.FC = () => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Risk Factor Breakdown
        </Typography>
        <List>
          {riskFactors.map((risk, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #eee' }}>
              <ListItemText
                primary={<Typography variant="subtitle1">{risk.factor}</Typography>}
                secondary={<Typography variant="body2">{risk.description}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </StyledCard>
  );
};

export default RiskFactorBreakdown;
