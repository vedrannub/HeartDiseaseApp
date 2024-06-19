import React from 'react';
import { Card, CardProps } from '@mui/material';

const cardStyles = {
  minWidth: 275,
  mb: 2,
  p: 2,
  borderRadius: 2,
  boxShadow: 3,
  backgroundColor: '#f5f5f5',
  height: '100%'
};

const StyledCard: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <Card sx={cardStyles} {...props}>
      {children}
    </Card>
  );
};

export default StyledCard;
