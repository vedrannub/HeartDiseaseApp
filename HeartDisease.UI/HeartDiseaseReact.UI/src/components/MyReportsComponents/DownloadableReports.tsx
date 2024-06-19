import React from 'react';
import { CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import StyledCard from '~/components/Common/StyledCard'; // Adjust the path as needed

const downloadableReports = [
  { title: 'Annual Checkup Report', date: '2024-06-01', file: 'checkup_report.pdf' },
  { title: 'Blood Test Results', date: '2024-05-15', file: 'blood_test_results.pdf' },
  { title: 'Cardiologist Visit Summary', date: '2024-04-20', file: 'cardiologist_visit.pdf' },
];

const DownloadableReports: React.FC = () => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Downloadable Reports
        </Typography>
        <List>
          {downloadableReports.map((report, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #eee', alignItems: 'flex-start' }}>
              <ListItemText
                primary={<Typography variant="subtitle1">{report.title}</Typography>}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      {report.date}
                    </Typography>
                  </>
                }
              />
              <Button variant="contained" color="primary" sx={{ marginLeft: 'auto' }}>
                Download
              </Button>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </StyledCard>
  );
};

export default DownloadableReports;
