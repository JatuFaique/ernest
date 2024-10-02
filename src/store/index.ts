import { configureStore } from "@reduxjs/toolkit";
import temperatureReducer from "./temperatureSlice";
import weatherReducer from "./weatherSlice";

// Define the type for the store's state
export type RootState = ReturnType<typeof store.getState>;

// Define the type for dispatch
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: {
        temperature: temperatureReducer,
        weather: weatherReducer,
    },
});

export default store;
