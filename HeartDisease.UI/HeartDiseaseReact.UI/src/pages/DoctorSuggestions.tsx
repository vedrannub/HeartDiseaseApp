import React, { useState, useEffect } from 'react';
import { Box, Container, CssBaseline, Typography, Grid, TextField, Button, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Select, MenuItem, InputLabel, FormControl, InputAdornment } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import { SelectChangeEvent } from '@mui/material/Select';
import { TextFieldProps } from '@mui/material/TextField';

const defaultTheme = createTheme();

const DoctorSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null);

  useEffect(() => {
    // Dummy data
    const dummySuggestions = [
      { title: 'Exercise Regularly', description: 'Engage in at least 30 minutes of physical activity daily.', category: 'Health', date: '2023-06-01' },
      { title: 'Healthy Diet', description: 'Consume a balanced diet rich in fruits and vegetables.', category: 'Nutrition', date: '2023-06-05' },
      { title: 'Regular Checkups', description: 'Visit your doctor for regular health checkups.', category: 'Health', date: '2023-06-10' },
      { title: 'Stay Hydrated', description: 'Drink at least 8 glasses of water a day.', category: 'Nutrition', date: '2023-06-15' },
    ];
    setSuggestions(dummySuggestions);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value as string);
  };

  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate);
  };

  const handleLearnMore = (suggestion: any) => {
    setSelectedSuggestion(suggestion);
  };

  const handleClose = () => {
    setSelectedSuggestion(null);
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.title.toLowerCase().includes(filter.toLowerCase()) &&
    (category === '' || suggestion.category === category) &&
    (date === null || new Date(suggestion.date).toDateString() === date?.toDateString())
  );

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
            Doctor Suggestions
          </Typography>
          <Box sx={{ mb: 4, width: '100%' }}>
            <TextField
              label="Filter Suggestions"
              variant="outlined"
              fullWidth
              value={filter}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    onChange={handleCategoryChange}
                    label="Category"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Health">Health</MenuItem>
                    <MenuItem value="Nutrition">Nutrition</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={4}>
            {filteredSuggestions.map((suggestion, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {suggestion.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {suggestion.description}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Category: {suggestion.category}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => handleLearnMore(suggestion)}>
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Dialog open={Boolean(selectedSuggestion)} onClose={handleClose}>
          <DialogTitle>{selectedSuggestion?.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{selectedSuggestion?.description}</DialogContentText>
            <Typography variant="body2" color="textSecondary">
              Category: {selectedSuggestion?.category}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Date: {selectedSuggestion?.date}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default DoctorSuggestions;
