import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  // Slice is named "filter" and has an initial state of an empty string
  name: "filter",
  initialState: "",
  reducers: {
    // Handles the action to update the filter state
    setFilter: (state, action) => action.payload,
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
