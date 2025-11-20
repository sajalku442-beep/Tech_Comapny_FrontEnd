import { createSlice } from "@reduxjs/toolkit";

const caseSlice = createSlice({
  name: "insight",
  initialState: {
    insight: null,
    allinsights: [],
  },

  reducers: {
    setInsight: (state, action) => {
      state.insight = action.payload;
    },
    setAllinsights: (state, action) => {
      state.allinsights = action.payload;
    },
  },
});
export const { setInsight, setAllinsights } = caseSlice.actions;
export default caseSlice.reducer;
