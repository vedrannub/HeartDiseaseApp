import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { NotificationImportant as NotificationImportantIcon } from '@mui/icons-material';
import StyledCard from '../Common/StyledCard';

interface Notification {
    message: string;
    date: string;
  }
  
  const notifications: Notification[] = [
    { message: 'Reminder: Take your morning medication.', date: '2024-06-15' },
    { message: 'Appointment Dr.Smith 10:00 AM.', date: '2024-06-19' },
    { message: 'New test results available.', date: '2024-06-14' },
  ];

  const Notifications: React.FC = () => {
    return (
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <List>
            {notifications.map((notification, index) => (
              <ListItem key={index} sx={{ borderBottom: '1px solid #eee', alignItems: 'flex-start' }}>
                <NotificationImportantIcon sx={{ color: 'orange', marginRight: '10px' }} />
                <ListItemText
                  primary={<Typography variant="subtitle1">{notification.message}</Typography>}
                  secondary={<Typography variant="body2">{notification.date}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </StyledCard>
    );
  };
  
  export default Notifications;