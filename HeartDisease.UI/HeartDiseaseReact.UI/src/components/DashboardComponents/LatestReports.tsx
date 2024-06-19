import React from 'react';
import { CardContent, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import StyledCard from '../Common/StyledCard';// Adjust the path as needed


interface Report {
    title: string;
    date: string;
    summary: string;
  }
  
  const reports: Report[] = [
    { title: 'Annual Checkup', date: '2024-06-01', summary: 'Overall health is good, cholesterol increase.' },
    { title: 'Blood Test Results', date: '2024-05-15', summary: 'Slightly elevated blood sugar levels.' },
    { title: 'Cardiologist Visit', date: '2024-04-20', summary: 'Heart condition stable, no new concerns.' },
  ];

const LatestReports: React.FC = () => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Latest Reports
        </Typography>
        <List>
          {reports.map((report, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #eee', alignItems: 'flex-start' }}>
              <CheckCircleIcon sx={{ color: 'green', marginRight: '10px' }} />
              <ListItemText
                primary={<Typography variant="subtitle1">{report.title}</Typography>}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      {report.date}
                    </Typography>
                    {' — '}
                    <Typography component="span" variant="body2">
                      {report.summary}
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

export default LatestReports;
