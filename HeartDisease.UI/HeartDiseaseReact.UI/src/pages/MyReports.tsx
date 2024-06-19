import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ReportSummary from '../components/MyReportsComponents/ReportSummary'
import DetailedReports from '~/components/MyReportsComponents/DetailedReports';
import GraphicalReports from '~/components/MyReportsComponents/GraphicalReports';
import DownloadableReports from '~/components/MyReportsComponents/DownloadableReports';

const MyReports: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 2, marginTop: '8px' }}>
      <Typography variant="h4" gutterBottom>
        My Reports
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ReportSummary />
        </Grid>
        <Grid item xs={12} md={6}>
          <DetailedReports />
        </Grid>
        <Grid item xs={12} md={6}>
          <GraphicalReports />
        </Grid>
        <Grid item xs={12}>
          <DownloadableReports />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyReports;
