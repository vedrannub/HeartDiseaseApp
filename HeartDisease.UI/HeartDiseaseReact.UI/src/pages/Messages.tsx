import React, { useState, useEffect } from 'react';
import { Box, Container, CssBaseline, Typography, Grid, Button, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, TextField, Paper, List, ListItem, ListItemText, Divider, DialogActions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const threadStatusColors = {
  active: '#4caf50',
  finished: '#9e9e9e',
  abandoned: '#f44336',
};

const Messages: React.FC = () => {
  const [threads, setThreads] = useState<any[]>([]);
  const [selectedThread, setSelectedThread] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>('');
  const [newThread, setNewThread] = useState({
    recipient: '',
    subject: '',
    messages: [] as any[],
    status: 'active',
  });

  useEffect(() => {
    // Dummy data for threads
    const dummyThreads = [
      {
        id: 1,
        recipient: 'Dr. Smith',
        subject: 'Follow-up',
        messages: [
          { id: 1, content: 'When is my next appointment?', date: '2023-07-01', sender: 'user' },
          { id: 2, content: 'Your appointment is scheduled for next Monday at 10 AM.', date: '2023-07-02', sender: 'doctor' },
        ],
        status: 'active',
      },
      {
        id: 2,
        recipient: 'Dr. Adams',
        subject: 'Prescription',
        messages: [
          { id: 1, content: 'Can you refill my prescription?', date: '2023-06-15', sender: 'user' },
          { id: 2, content: 'Sure, I have sent the prescription to your pharmacy.', date: '2023-06-16', sender: 'doctor' },
        ],
        status: 'finished',
      },
      {
        id: 3,
        recipient: 'Dr. Lee',
        subject: 'Missed Appointment',
        messages: [
          { id: 1, content: 'I missed my appointment yesterday. What should I do?', date: '2023-07-10', sender: 'user' },
          { id: 2, content: 'Please reschedule your appointment.', date: '2023-07-11', sender: 'doctor' },
        ],
        status: 'abandoned',
      },
    ];
    setThreads(dummyThreads);
  }, []);

  const handleNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (selectedThread) {
      const updatedThreads = threads.map((thread) =>
        thread.id === selectedThread.id
          ? {
              ...thread,
              messages: [
                ...thread.messages,
                { id: thread.messages.length + 1, content: newMessage, date: new Date().toISOString(), sender: 'user' },
              ],
            }
          : thread
      );
      setThreads(updatedThreads);
      setSelectedThread({
        ...selectedThread,
        messages: [
          ...selectedThread.messages,
          { id: selectedThread.messages.length + 1, content: newMessage, date: new Date().toISOString(), sender: 'user' },
        ],
      });
    } else {
      const newThreadData = {
        ...newThread,
        messages: [{ id: 1, content: newMessage, date: new Date().toISOString(), sender: 'user' }],
        status: 'active',
      };
      setThreads([...threads, { ...newThreadData, id: threads.length + 1 }]);
    }
    setNewMessage('');
    setOpenDialog(false);
  };

  const handleNewThreadChange = (field: string, value: any) => {
    setNewThread((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleViewThread = (thread: any) => {
    if (thread.status !== 'abandoned') {
      setSelectedThread(thread);
    }
  };

  const handleCloseThread = () => {
    setSelectedThread(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Messages
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} sx={{ mb: 4 }}>
            Start New Conversation
          </Button>
          <Grid container spacing={4}>
            {threads.map((thread, index) => (
              <Grid item key={index} xs={12}>
                <Card
                  sx={{
                    borderLeft: `5px solid ${threadStatusColors[thread.status as keyof typeof threadStatusColors]}`,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {thread.subject}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      With: {thread.recipient}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Status: {thread.status.charAt(0).toUpperCase() + thread.status.slice(1)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleViewThread(thread)}
                      disabled={thread.status === 'abandoned'}
                    >
                      {thread.status === 'abandoned' ? 'Unavailable' : 'View Thread'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Dialog open={Boolean(selectedThread)} onClose={handleCloseThread} fullWidth maxWidth="md">
          <DialogTitle>{selectedThread?.subject}</DialogTitle>
          <DialogContent>
            <List>
              {selectedThread?.messages.map((message: any) => (
                <ListItem key={message.id} alignItems="flex-start">
                  <ListItemText
                    primary={message.sender === 'user' ? 'You' : selectedThread.recipient}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="textPrimary">
                          {message.content}
                        </Typography>
                        <br />
                        <Typography component="span" variant="caption" color="textSecondary">
                          {new Date(message.date).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            {selectedThread?.status === 'active' && (
              <>
                <TextField
                  label="Type your message"
                  value={newMessage}
                  onChange={handleNewMessageChange}
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Button onClick={handleSendMessage} color="primary">
                  Send
                </Button>
              </>
            )}
            <Button onClick={handleCloseThread} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
          <DialogTitle>Start New Conversation</DialogTitle>
          <DialogContent>
            <TextField
              label="Recipient"
              value={newThread.recipient}
              onChange={(e) => handleNewThreadChange('recipient', e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Subject"
              value={newThread.subject}
              onChange={(e) => handleNewThreadChange('subject', e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Message"
              value={newMessage}
              onChange={handleNewMessageChange}
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSendMessage} color="primary">
              Start
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default Messages;
