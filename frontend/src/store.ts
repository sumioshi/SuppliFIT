import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import subscriptionReducer from './features/subscription/subscriptionSlice';
import supplementsReducer from './features/supplements/supplementsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    subscription: subscriptionReducer,
    supplements: supplementsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store; 