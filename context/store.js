import myReducer from "./reducers";
import { configureStore } from '@reduxjs/toolkit';

const Store = configureStore({
  reducer: {
    user: myReducer,
  },
});

export default Store;