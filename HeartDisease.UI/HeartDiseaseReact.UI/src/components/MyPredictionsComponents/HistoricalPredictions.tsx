import React from 'react';
import { CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StyledCard from '~/components/Common/StyledCard'; // Adjust the path as needed

const data = [
  { name: 'Jan', risk: 20 },
  { name: 'Feb', risk: 25 },
  { name: 'Mar', risk: 30 },
  { name: 'Apr', risk: 28 },
  { name: 'May', risk: 27 },
  { name: 'Jun', risk: 26 },
];

export default function HistoricalPredictions () {
  return (
    <StyledCard  sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Historical Predictions
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="risk" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </StyledCard>
  );
};