import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, TextField, Typography, Avatar, Grid, Divider, Paper, ButtonGroup, FormControlLabel, Switch } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';

const defaultTheme = createTheme();

const MyAccountPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  // Dummy data for demonstration
  const [email, setEmail] = useState<string>('johndoe@example.com');
  const [username, setUsername] = useState<string>('John Doe');
  const [phone, setPhone] = useState<string>('123-456-7890');
  const [age, setAge] = useState<number | string>(30);
  const [socialNumber, setSocialNumber] = useState<string>('123456789');
  const [medicalID, setMedicalID] = useState<string>('MED12345');
  const [primaryPhysician, setPrimaryPhysician] = useState<string>('Dr. Smith');
  const [insuranceDetails, setInsuranceDetails] = useState<string>('Health Insurance Co.');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSaveDetails = () => {
    // Handle save details logic
    alert('Profile updated successfully');
  };

  const handleChangePassword = () => {
    // Handle change password logic
    alert('Password changed successfully');
    setCurrentPassword('');
    setNewPassword('');
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  const handleToggleEmailNotifications = () => setEmailNotifications(!emailNotifications);
  const handleToggleSmsNotifications = () => setSmsNotifications(!smsNotifications);

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
          <Box component={Paper} elevation={3} sx={{ p: 4, mt: 3, width: '100%' }}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
              <Button onClick={() => handleTabChange(0)} sx={{ flex: 1, borderRadius: selectedTab === 0 ? 2 : 0 }}>Profile Information</Button>
              <Button onClick={() => handleTabChange(1)} sx={{ flex: 1, borderRadius: selectedTab === 1 ? 2 : 0 }}>Account Settings</Button>
              <Button onClick={() => handleTabChange(2)} sx={{ flex: 1, borderRadius: selectedTab === 2 ? 2 : 0 }}>Medical Information</Button>
              <Button onClick={() => handleTabChange(3)} sx={{ flex: 1, borderRadius: selectedTab === 3 ? 2 : 0 }}>Activity Log</Button>
              <Button onClick={() => handleTabChange(4)} sx={{ flex: 1, borderRadius: selectedTab === 4 ? 2 : 0 }}>Support</Button>
            </ButtonGroup>
            <Box sx={{ p: 3 }}>
              {selectedTab === 0 && (
                <Box>
                  {/* Profile Information Section */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      mb: 3,
                    }}
                  >
                    <Avatar
                      alt={username}
                      src={photo ? URL.createObjectURL(photo) : ''}
                      sx={{ m: 2, bgcolor: 'secondary.main', width: 100, height: 100 }}
                    />
                    <Typography variant="h5">{username}</Typography>
                    <Typography variant="body1">{email}</Typography>
                    <Typography variant="body1">Phone: {phone}</Typography>
                  </Box>
                  <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Divider sx={{ mb: 3 }} />
                    <Typography variant="h6" gutterBottom>
                      Edit Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="update-username"
                          label="Username"
                          name="username"
                          autoComplete="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="update-email"
                          label="Email"
                          name="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="update-phone"
                          label="Phone Number"
                          name="phone"
                          autoComplete="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="update-age"
                          label="Age"
                          name="age"
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="update-social-number"
                          label="Social Number"
                          name="social-number"
                          value={socialNumber}
                          onChange={(e) => setSocialNumber(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <input
                          accept="image/*"
                          id="photo"
                          type="file"
                          onChange={handlePhotoChange}
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="photo">
                          <Button variant="contained" component="span" sx={{ mt: 2 }}>
                            Upload Photo
                          </Button>
                        </label>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h6" gutterBottom>
                      Change Password
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          fullWidth
                          name="current-password"
                          label="Current Password"
                          type="password"
                          id="current-password"
                          autoComplete="current-password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          fullWidth
                          name="new-password"
                          label="New Password"
                          type="password"
                          id="new-password"
                          autoComplete="new-password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="button"
                          fullWidth
                          variant="contained"
                          onClick={handleChangePassword}
                        >
                          Change Password
                        </Button>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Grid container justifyContent="flex-end">
                      <Button
                        type="button"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveDetails}
                      >
                        Save Details
                      </Button>
                    </Grid>
                  </Box>
                </Box>
              )}
              {selectedTab === 1 && (
                <Box>
                  {/* Account Settings Section */}
                  <Typography variant="h6" gutterBottom>
                    Account Settings
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Button variant="contained" sx={{ mr: 2 }}>
                      Set Up Two-Factor Authentication
                    </Button>
                    <Button variant="contained">
                      Manage Email Notifications
                    </Button>
                  </Box>
                  <Box>
                    <FormControlLabel
                      control={<Switch checked={emailNotifications} onChange={handleToggleEmailNotifications} />}
                      label="Email Notifications"
                      sx={{ mt: 2 }}
                    />
                    <FormControlLabel
                      control={<Switch checked={smsNotifications} onChange={handleToggleSmsNotifications} />}
                      label="SMS Notifications"
                      sx={{ mt: 2 }}
                    />
                  </Box>
                </Box>
              )}
              {selectedTab === 2 && (
                <Box>
                  {/* Medical Information Section */}
                  <Typography variant="h6" gutterBottom>
                    Medical Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="normal"
                        fullWidth
                        id="medical-id"
                        label="Medical ID"
                        value={medicalID}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        margin="normal"
                        fullWidth
                        id="primary-physician"
                        label="Primary Physician"
                        value={primaryPhysician}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        fullWidth
                        id="insurance-details"
                        label="Insurance Details"
                        value={insuranceDetails}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}
              {selectedTab === 3 && (
                <Box>
                  {/* Activity Log Section */}
                  <Typography variant="h6" gutterBottom>
                    Activity Log
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2">Recent Logins:</Typography>
                    <ul>
                      <li>Login at 2023-06-23 12:34</li>
                      <li>Login at 2023-06-22 08:21</li>
                    </ul>
                    <Typography variant="body2">Recent Changes:</Typography>
                    <ul>
                      <li>Profile updated at 2023-06-20</li>
                      <li>Password changed at 2023-06-18</li>
                    </ul>
                  </Box>
                </Box>
              )}
              {selectedTab === 4 && (
                <Box>
                  {/* Support Section */}
                  <Typography variant="h6" gutterBottom>
                    Support
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Button variant="contained" sx={{ mr: 2 }}>
                      Contact Support
                    </Button>
                    <Button variant="contained">
                      FAQs
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default MyAccountPage;
