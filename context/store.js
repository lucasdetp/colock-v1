import myReducer from "./reducers";
import { configureStore } from '@reduxjs/toolkit';

const Store = configureStore({
  reducer: {
    myReducer,
  },
});

export default Store;