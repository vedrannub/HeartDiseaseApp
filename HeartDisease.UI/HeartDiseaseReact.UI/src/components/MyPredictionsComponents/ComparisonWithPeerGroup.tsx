import React from 'react';
import { CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StyledCard from '~/components/Common/StyledCard'; // Adjust the path as needed

const peerData = [
  { name: 'You', risk: 25 },
  { name: 'Peers', risk: 35 },
];

const ComparisonWithPeerGroup: React.FC = () => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Comparison with Peer Group
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={peerData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="risk" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </StyledCard>
  );
};

export default ComparisonWithPeerGroup;
