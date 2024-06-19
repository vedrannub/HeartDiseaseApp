import React from 'react';
import { CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StyledCard from '~/components/Common/StyledCard'; // Adjust the path as needed

const data = [
  { name: 'Jan', cholesterol: 5.8, glucose: 5.3 },
  { name: 'Feb', cholesterol: 6.1, glucose: 5.5 },
  { name: 'Mar', cholesterol: 6.0, glucose: 5.4 },
  { name: 'Apr', cholesterol: 6.2, glucose: 5.6 },
  { name: 'May', cholesterol: 6.1, glucose: 5.5 },
  { name: 'Jun', cholesterol: 6.3, glucose: 5.7 },
];

const GraphicalReports: React.FC = () => {
  return (
    <StyledCard sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Graphical Reports
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cholesterol" stroke="#8884d8" />
            <Line type="monotone" dataKey="glucose" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </StyledCard>
  );
};

export default GraphicalReports;
