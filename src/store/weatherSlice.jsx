import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
  },
  reducers: {
    updateWeatherData: (state, action) => {
      console.log('im called',state.data, action.payload)
      state.data = action.payload;
    },
  },
});

export const { updateWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;