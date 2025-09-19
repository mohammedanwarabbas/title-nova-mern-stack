import { configureStore } from '@reduxjs/toolkit';
import titleReducer from './slices/titleSlice';

const store = configureStore({
  reducer: {
    title: titleReducer,
  },
});

// Export types for usage in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;