import { configureStore } from '@reduxjs/toolkit';
import housesReducer from '../redux/houseSlice';
import authReducer from '../redux/authSlice';

const store = configureStore({
  reducer: {
    houses: housesReducer,
    auth: authReducer,
  },
});

export default store;