import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', bloodPressure: 120, heartRate: 70, cholesterol: 200 },
  { name: 'Feb', bloodPressure: 122, heartRate: 72, cholesterol: 205 },
  { name: 'Mar', bloodPressure: 118, heartRate: 68, cholesterol: 198 },
  { name: 'Apr', bloodPressure: 121, heartRate: 71, cholesterol: 202 },
  { name: 'May', bloodPressure: 119, heartRate: 69, cholesterol: 199 },
  { name: 'Jun', bloodPressure: 123, heartRate: 73, cholesterol: 207 },
];

const HistoricalDataAndTrends: React.FC = () => {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Historical Data and Trends
        </Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bloodPressure" stroke="#8884d8" />
              <Line type="monotone" dataKey="heartRate" stroke="#82ca9d" />
              <Line type="monotone" dataKey="cholesterol" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HistoricalDataAndTrends;
