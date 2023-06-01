import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "../redux/slice/contactSlice";

// passing contactRendered to renducer
const store = configureStore({
  reducer: {
    contact: contactReducer,
  },
});

export default store;

// important for type inference
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;