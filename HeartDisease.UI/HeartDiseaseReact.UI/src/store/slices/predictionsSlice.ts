/**
 * Predictions Redux Slice
 * Manages predictions data and loading states
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PredictionService } from '../../services/api/predictionService';
import { PredictionDto, CreatePredictionDto, PredictionRequestDto } from '../../types/dtos';

interface PredictionsState {
  predictions: PredictionDto[];
  selectedPrediction: PredictionDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: PredictionsState = {
  predictions: [],
  selectedPrediction: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchAllPredictions = createAsyncThunk(
  'predictions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await PredictionService.getAllPredictions();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch predictions');
    }
  }
);

export const fetchPredictionById = createAsyncThunk(
  'predictions/fetchById',
  async (predictionId: number, { rejectWithValue }) => {
    try {
      return await PredictionService.getPredictionById(predictionId);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch prediction');
    }
  }
);

export const createNewPrediction = createAsyncThunk(
  'predictions/create',
  async (predictionData: CreatePredictionDto, { rejectWithValue }) => {
    try {
      return await PredictionService.createPrediction(predictionData);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create prediction');
    }
  }
);

export const updatePredictionData = createAsyncThunk(
  'predictions/update',
  async ({ predictionId, data }: { predictionId: number; data: Partial<CreatePredictionDto> }, { rejectWithValue }) => {
    try {
      await PredictionService.updatePrediction(predictionId, data);
      return predictionId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update prediction');
    }
  }
);

export const deletePredictionData = createAsyncThunk(
  'predictions/delete',
  async (predictionId: number, { rejectWithValue }) => {
    try {
      await PredictionService.deletePrediction(predictionId);
      return predictionId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete prediction');
    }
  }
);

export const getMlPrediction = createAsyncThunk(
  'predictions/getMl',
  async (requestData: PredictionRequestDto, { rejectWithValue }) => {
    try {
      return await PredictionService.getMlPrediction(requestData);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to get ML prediction');
    }
  }
);

// Slice
const predictionsSlice = createSlice({
  name: 'predictions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    selectPrediction: (state, action: PayloadAction<PredictionDto | null>) => {
      state.selectedPrediction = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all predictions
    builder.addCase(fetchAllPredictions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllPredictions.fulfilled, (state, action) => {
      state.loading = false;
      state.predictions = action.payload;
    });
    builder.addCase(fetchAllPredictions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch by ID
    builder.addCase(fetchPredictionById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPredictionById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedPrediction = action.payload;
    });
    builder.addCase(fetchPredictionById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create prediction
    builder.addCase(createNewPrediction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createNewPrediction.fulfilled, (state, action) => {
      state.loading = false;
      state.predictions.push(action.payload);
    });
    builder.addCase(createNewPrediction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete prediction
    builder.addCase(deletePredictionData.fulfilled, (state, action) => {
      state.predictions = state.predictions.filter((p) => p.predictionId !== action.payload);
    });

    // ML Prediction
    builder.addCase(getMlPrediction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMlPrediction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getMlPrediction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, selectPrediction } = predictionsSlice.actions;
export default predictionsSlice.reducer;
