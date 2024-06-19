import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Event as EventIcon } from '@mui/icons-material';
import StyledCard from '../Common/StyledCard';


interface Appointment {
  date: string;
  time: string;
  doctor: string;
  location: string;
}

const appointments: Appointment[] = [
  { date: '2024-06-20', time: '10:00 AM', doctor: 'Dr. Smith', location: 'Clinic A' },
  { date: '2024-07-10', time: '02:00 PM', doctor: 'Dr. Johnson', location: 'Clinic B' },
  { date: '2024-07-25', time: '11:30 AM', doctor: 'Dr. Brown', location: 'Clinic C' },
];

const UpcomingAppointments: React.FC = () => {
    return (
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upcoming Appointments
          </Typography>
          <List>
            {appointments.map((appointment, index) => (
              <ListItem key={index} sx={{ borderBottom: '1px solid #eee', alignItems: 'flex-start' }}>
                <EventIcon sx={{ color: 'blue', marginRight: '10px' }} />
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">
                      {appointment.date} at {appointment.time}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        {appointment.doctor}
                      </Typography>
                      {' — '}
                      <Typography component="span" variant="body2">
                        {appointment.location}
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
  
  export default UpcomingAppointments;