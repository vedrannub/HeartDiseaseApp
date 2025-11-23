# Migration Guide: Old to New Architecture

This guide helps you migrate existing components from the old architecture to the new, simplified API integration.

## Quick Reference

### Before (Old Way)
```typescript
import axios from 'axios'
import { getPredictions } from '@/resources/api-constants'

async function fetchPredictions() {
  try {
    const response = await axios.get(getPredictions())
    const data = toCamelCase(response.data)
    setLoading(false)
    setPredictions(data)
  } catch (error) {
    console.error(error)
  }
}
```

### After (New Way)
```typescript
import { useAppDispatch, useAppSelector } from '@/store/reducers/store'
import { fetchAllPredictions } from '@/store/slices/predictionsSlice'

// In component
const dispatch = useAppDispatch()
const { predictions, loading } = useAppSelector(state => state.predictions)

useEffect(() => {
  dispatch(fetchAllPredictions())
}, [dispatch])
```

## Step-by-Step Migration

### 1. Authentication Component

**Old Code (LoginPage.tsx)**
```typescript
import axios from 'axios'

const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)

const handleLogin = async (email: string, password: string) => {
  setLoading(true)
  try {
    const response = await axios.post('http://localhost:5142/users/login', {
      email,
      password,
    })
    localStorage.setItem('token', response.data.token)
    navigate('/dashboard')
  } catch (error) {
    setError('Login failed')
  } finally {
    setLoading(false)
  }
}
```

**New Code (LoginPage.tsx)**
```typescript
import { useAppDispatch, useAppSelector } from '@/store/reducers/store'
import { login } from '@/store/slices/authSlice'

const dispatch = useAppDispatch()
const { loading, error } = useAppSelector(state => state.auth)

const handleLogin = async (email: string, password: string) => {
  try {
    await dispatch(login({ email, password })).unwrap()
    navigate('/dashboard')
  } catch (err) {
    // Error is handled in Redux state
  }
}
```

### 2. Data Fetching Component

**Old Code (MyPredictions.tsx)**
```typescript
import axios from 'axios'

const [predictions, setPredictions] = useState([])
const [loading, setLoading] = useState(false)

useEffect(() => {
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:5142/predictions')
      setPredictions(toCamelCase(response.data))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [])
```

**New Code (MyPredictions.tsx)**
```typescript
import { useAppDispatch, useAppSelector } from '@/store/reducers/store'
import { fetchAllPredictions } from '@/store/slices/predictionsSlice'

const dispatch = useAppDispatch()
const { predictions, loading, error } = useAppSelector(state => state.predictions)

useEffect(() => {
  dispatch(fetchAllPredictions())
}, [dispatch])
```

### 3. Creating Data Component

**Old Code**
```typescript
const handleCreatePrediction = async (data: any) => {
  try {
    const response = await axios.post('http://localhost:5142/predictions', 
      toSnakeCase(data)
    )
    setPredictions([...predictions, response.data])
  } catch (error) {
    setError(error.message)
  }
}
```

**New Code**
```typescript
import { createNewPrediction } from '@/store/slices/predictionsSlice'

const handleCreatePrediction = async (data: any) => {
  try {
    await dispatch(createNewPrediction(data)).unwrap()
    // Predictions state automatically updated
  } catch (err) {
    // Error is in Redux state
  }
}
```

### 4. ML API Integration

**Old Code**
```typescript
const getMlPrediction = async (healthData: any) => {
  try {
    const response = await axios.post(
      'http://localhost:5050/api/prediction/predict',
      toSnakeCase(healthData)
    )
    return response.data
  } catch (error) {
    throw error
  }
}
```

**New Code**
```typescript
import { PredictionService } from '@/services/api'

const mlResponse = await PredictionService.getMlPrediction(healthData)
// Or dispatch Redux action
await dispatch(getMlPrediction(healthData)).unwrap()
```

## Common Patterns

### Pattern 1: Fetch Data on Mount

```typescript
useEffect(() => {
  dispatch(fetchAllPredictions())
}, [dispatch])
```

### Pattern 2: Conditional Rendering

```typescript
const { predictions, loading, error } = useAppSelector(state => state.predictions)

if (loading) return <CircularProgress />
if (error) return <Alert severity="error">{error}</Alert>
if (predictions.length === 0) return <Typography>No data</Typography>

return <YourDataComponent data={predictions} />
```

### Pattern 3: Form Submission

```typescript
const handleSubmit = async (formData: any) => {
  try {
    await dispatch(createNewPrediction(formData)).unwrap()
    // Success - component re-renders with new data
  } catch (err) {
    // Error is in Redux state, use useAppSelector to display
  }
}
```

### Pattern 4: Error Handling

```typescript
const { error } = useAppSelector(state => state.predictions)

if (error) {
  return (
    <Alert 
      severity="error"
      onClose={() => dispatch(clearError())}
    >
      {error}
    </Alert>
  )
}
```

## Files to Update

### Components to Migrate
1. **LoginPage.tsx** - Use authSlice
   - Replace axios calls with dispatch(login(...))
   - Use auth state from Redux

2. **RegisterPage.tsx** - Use authSlice
   - Replace axios calls with dispatch(register(...))
   - Handle form validation

3. **MyPredictions.tsx** - Use predictionsSlice
   - Replace axios calls with dispatch(fetchAllPredictions())
   - Display predictions from Redux state

4. **MyReports.tsx** - Needs new implementation
   - Could be similar to MyPredictions
   - May use same prediction data

5. **HealthData.tsx** - Use PredictionService/predictionsSlice
   - Form to submit health data
   - Possibly call getMlPrediction

6. **All Prediction Components**
   - PredictionSummary.tsx
   - DetailedPredictionResults.tsx
   - HistoricalPredictions.tsx
   - RiskFactorBreakdown.tsx
   - LifestyleRecommendations.tsx
   - ComparisonWithPeerGroup.tsx

### Files to Remove/Keep

**Remove (after verifying no usage):**
- ~~src/store/actions/thunkActions.ts~~ → Replaced by Redux slices
- ~~src/resources/api-constants.ts~~ → URLs now in .env
- ~~src/utility/customAxios.ts~~ → Replaced by services/api/axiosClient.ts

**Keep:**
- src/store/reducers/data.ts (legacy, can be slowly deprecated)
- src/store/reducers/store.ts (updated with new slices)

## Debugging Tips

### Check Redux State
```typescript
// In browser console
import store from '@/store/reducers/store'
console.log(store.getState())
```

### Verify API Calls
```typescript
// Check if token is being sent
// Open DevTools → Network tab → Look for Authorization header
```

### Test Service Directly
```typescript
// In browser console
import { PredictionService } from '@/services/api'
await PredictionService.getAllPredictions()
```

## Testing

### Service Testing
```typescript
import { PredictionService } from '@/services/api'
import MockAdapter from 'axios-mock-adapter'
import { mainApiClient } from '@/services/api'

const mock = new MockAdapter(mainApiClient)
mock.onGet('/predictions').reply(200, [{...}])
const data = await PredictionService.getAllPredictions()
```

### Component Testing
```typescript
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/store/reducers/store'

render(
  <Provider store={store}>
    <YourComponent />
  </Provider>
)

await waitFor(() => {
  expect(screen.getByText('...')).toBeInTheDocument()
})
```

## Troubleshooting

### Issue: CORS Error
**Solution**: Check `REACT_APP_MAIN_API_URL` in .env matches backend CORS setting

### Issue: Token Not Sent
**Solution**: Token is automatically added by Axios interceptor from localStorage

### Issue: camelCase Not Working
**Solution**: Check response interceptor in axiosClient.ts is properly transforming

### Issue: State Not Updating
**Solution**: Make sure you're using `useAppSelector` from store/reducers/store

### Issue: Infinite Loading
**Solution**: Verify dispatch is in useEffect dependency array `[dispatch]`

## Performance Tips

1. **Memoize selectors** for components with many re-renders
2. **Use Redux DevTools** to trace actions
3. **Lazy load components** that don't need initial predictions
4. **Cache API responses** if needed
5. **Batch multiple requests** where possible

## Need Help?

1. Check API_INTEGRATION.md for detailed API reference
2. Look at Example components for usage patterns
3. Check service files for available methods
4. Verify Redux DevTools is installed for state debugging
