import React from 'react';
import { Card, CardContent, Typography, Box, Grid, List, ListItem, ListItemText } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const riskData = [
  { name: 'Blood Pressure', value: 140 },
  { name: 'Cholesterol', value: 220 },
  { name: 'Heart Rate', value: 72 },
  { name: 'Smoking', value: 1 },
  { name: 'Physical Activity', value: 2 },
];

const riskFactors = [
  { factor: 'Blood Pressure', description: 'High blood pressure increases the risk of heart disease.', level: 'High' },
  { factor: 'Cholesterol', description: 'High cholesterol levels can lead to heart disease.', level: 'High' },
  { factor: 'Heart Rate', description: 'An abnormal heart rate can be a risk factor.', level: 'Normal' },
  { factor: 'Smoking', description: 'Smoking significantly increases the risk of heart disease.', level: 'High' },
  { factor: 'Physical Activity', description: 'Low physical activity increases the risk.', level: 'Medium' },
];

const RiskAssessment: React.FC = () => {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Risk Assessment
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={riskData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              {riskFactors.map((risk, index) => (
                <ListItem key={index} sx={{ borderBottom: '1px solid #eee' }}>
                  <ListItemText
                    primary={risk.factor}
                    secondary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{risk.description}</span>
                        <span><strong>{risk.level}</strong></span>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RiskAssessment;
