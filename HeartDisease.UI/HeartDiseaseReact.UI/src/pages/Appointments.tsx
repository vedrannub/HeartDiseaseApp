import React, { useState, useEffect } from 'react';
import { Box, Container, CssBaseline, Typography, Grid, Button, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const defaultTheme = createTheme();

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [newAppointment, setNewAppointment] = useState({
    date: null as Date | null,
    time: null as Date | null,
    doctor: '',
    reason: ''
  });

  useEffect(() => {
    // Dummy data
    const dummyAppointments = [
      { id: 1, date: '2023-07-01', time: '10:00', doctor: 'Dr. Smith', reason: 'Routine Checkup', status: 'Upcoming' },
      { id: 2, date: '2023-06-15', time: '14:00', doctor: 'Dr. Adams', reason: 'Follow-up', status: 'Completed' },
    ];
    setAppointments(dummyAppointments);
  }, []);

  const handleNewAppointmentChange = (field: string, value: any) => {
    setNewAppointment(prevState => ({ ...prevState, [field]: value }));
  };

  const handleScheduleAppointment = () => {
    // Logic to schedule a new appointment
    setOpenDialog(false);
    setNewAppointment({ date: null, time: null, doctor: '', reason: '' });
  };

  const handleViewDetails = (appointment: any) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseDetails = () => {
    setSelectedAppointment(null);
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
              Appointments
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} sx={{ mb: 4 }}>
              Schedule New Appointment
            </Button>
            <Grid container spacing={4}>
              {appointments.map((appointment, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {appointment.date} - {appointment.time}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Doctor: {appointment.doctor}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Reason: {appointment.reason}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Status: {appointment.status}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" onClick={() => handleViewDetails(appointment)}>
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Dialog open={Boolean(selectedAppointment)} onClose={handleCloseDetails}>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogContent>
              {selectedAppointment && (
                <Box>
                  <Typography variant="h6">{selectedAppointment.date} - {selectedAppointment.time}</Typography>
                  <Typography variant="body2">Doctor: {selectedAppointment.doctor}</Typography>
                  <Typography variant="body2">Reason: {selectedAppointment.reason}</Typography>
                  <Typography variant="body2">Status: {selectedAppointment.status}</Typography>
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
            <DialogTitle>Schedule New Appointment</DialogTitle>
            <DialogContent>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <DatePicker
                  label="Date"
                  value={newAppointment.date}
                  onChange={(newDate) => handleNewAppointmentChange('date', newDate)}
                />
                <TimePicker
                  label="Time"
                  value={newAppointment.time}
                  onChange={(newTime) => handleNewAppointmentChange('time', newTime)}
                />
                <TextField
                  label="Doctor"
                  value={newAppointment.doctor}
                  onChange={(e) => handleNewAppointmentChange('doctor', e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Reason"
                  value={newAppointment.reason}
                  onChange={(e) => handleNewAppointmentChange('reason', e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                  sx={{ mb: 2 }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleScheduleAppointment} color="primary">
                Schedule
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Appointments;
