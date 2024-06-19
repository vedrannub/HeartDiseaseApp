import React from 'react';
import { CardContent, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import StyledCard from '~/components/Common/StyledCard'; // Adjust the path as needed

const detailedReports = [
  {
    title: 'Blood Test',
    date: '2024-05-15',
    details: [
      { name: 'Glucose', value: '5.5 mmol/L', reference: '3.5 - 5.5 mmol/L' },
      { name: 'Cholesterol', value: '6.2 mmol/L', reference: '3.0 - 5.2 mmol/L' },
    ],
  },
  {
    title: 'ECG Report',
    date: '2024-04-25',
    details: [{ name: 'Heart Rate', value: '72 bpm', reference: '60 - 100 bpm' }],
  },
];

const DetailedReports: React.FC = () => {
  return (
    <StyledCard  sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Detailed Reports
        </Typography>
        {detailedReports.map((report, index) => (
          <Box key={index} >
            <Typography variant="subtitle1">{report.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {report.date}
            </Typography>
            <List>
              {report.details.map((detail, i) => (
                <ListItem key={i} sx={{ borderBottom: '1px solid #eee', alignItems: 'flex-start' }}>
                  <ListItemText
                    primary={<Typography variant="body1">{detail.name}</Typography>}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="textPrimary">
                          {detail.value}
                        </Typography>
                        {' — '}
                        <Typography component="span" variant="body2">
                          {detail.reference}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </CardContent>
    </StyledCard>
  );
};

export default DetailedReports;
