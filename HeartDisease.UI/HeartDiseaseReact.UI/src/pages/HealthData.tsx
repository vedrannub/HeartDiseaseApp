import React, { useState, useEffect } from 'react';
import { Box, Container, CssBaseline, Typography, Grid, Button, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const defaultTheme = createTheme();

const HealthData: React.FC = () => {
  const [healthDataEntries, setHealthDataEntries] = useState<any[]>([]);
  const [selectedHealthData, setSelectedHealthData] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [newHealthData, setNewHealthData] = useState({
    date: null as Date | null,
    type: '',
    value: '',
  });

  useEffect(() => {
    // Dummy data
    const dummyHealthData = [
      { id: 1, date: '2023-07-01', type: 'Blood Pressure', value: '120/80' },
      { id: 2, date: '2023-06-15', type: 'Heart Rate', value: '75 bpm' },
    ];
    setHealthDataEntries(dummyHealthData);
  }, []);

  const handleNewHealthDataChange = (field: string, value: any) => {
    setNewHealthData(prevState => ({ ...prevState, [field]: value }));
  };

  const handleAddHealthData = () => {
    // Logic to add a new health data entry
    setOpenDialog(false);
    setNewHealthData({ date: null, type: '', value: '' });
  };

  const handleViewDetails = (healthData: any) => {
    setSelectedHealthData(healthData);
  };

  const handleCloseDetails = () => {
    setSelectedHealthData(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h4" gutterBottom>
              Health Data
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} sx={{ mb: 4 }}>
              Add New Health Data
            </Button>
            <Grid container spacing={4}>
              {healthDataEntries.map((healthData, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {healthData.type}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Date: {healthData.date}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Value: {healthData.value}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" onClick={() => handleViewDetails(healthData)}>
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Dialog open={Boolean(selectedHealthData)} onClose={handleCloseDetails}>
            <DialogTitle>Health Data Details</DialogTitle>
            <DialogContent>
              {selectedHealthData && (
                <Box>
                  <Typography variant="h6">{selectedHealthData.type}</Typography>
                  <Typography variant="body2">Date: {selectedHealthData.date}</Typography>
                  <Typography variant="body2">Value: {selectedHealthData.value}</Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetails} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Add New Health Data</DialogTitle>
            <DialogContent>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <DatePicker
                  label="Date"
                  value={newHealthData.date}
                  onChange={(newDate) => handleNewHealthDataChange('date', newDate)}
                />
                <TextField
                  label="Type"
                  value={newHealthData.type}
                  onChange={(e) => handleNewHealthDataChange('type', e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Value"
                  value={newHealthData.value}
                  onChange={(e) => handleNewHealthDataChange('value', e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddHealthData} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default HealthData;
