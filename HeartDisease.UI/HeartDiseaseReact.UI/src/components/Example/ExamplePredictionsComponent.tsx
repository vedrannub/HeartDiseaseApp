/**
 * Example Predictions Component using new architecture
 * Shows how to use Redux predictions slice and services
 */

import React, { useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/reducers/store';
import { fetchAllPredictions, clearError } from '../../store/slices/predictionsSlice';

const ExamplePredictionsComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { predictions, loading, error } = useAppSelector((state) => state.predictions);

  // Fetch predictions on component mount
  useEffect(() => {
    dispatch(fetchAllPredictions());
  }, [dispatch]);

  const handleClearError = () => {
    dispatch(clearError());
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          My Predictions
        </Typography>

        {error && (
          <Alert
            severity="error"
            onClose={handleClearError}
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        {predictions.length === 0 ? (
          <Typography color="textSecondary">
            No predictions found
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Patient ID</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {predictions.map((prediction) => (
                  <TableRow key={prediction.predictionId}>
                    <TableCell>{prediction.predictionId}</TableCell>
                    <TableCell>{prediction.patientId}</TableCell>
                    <TableCell>
                      {prediction.hasHeartDisease ? 'Risk Detected' : 'No Risk'}
                    </TableCell>
                    <TableCell>
                      {new Date(prediction.predictionDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined">
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ExamplePredictionsComponent;
