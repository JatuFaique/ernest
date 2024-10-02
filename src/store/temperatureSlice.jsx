import { createSlice } from "@reduxjs/toolkit";

const temperatureSlice = createSlice({
  name: "temperature",
  initialState: {
    isCelsius: true,
  },
  reducers: {
    toggleTemperatureUnit: (state) => {
      state.isCelsius = !state.isCelsius;
    },
  },
});

export const { toggleTemperatureUnit } = temperatureSlice.actions;
export default temperatureSlice.reducer;
