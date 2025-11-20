import { createSlice } from "@reduxjs/toolkit";

const caseSlice = createSlice({
  name: "case",
  initialState: {
    caseblog: null,
    allcaseblogs: [],
  },

  reducers: {
    setCaseblog: (state, action) => {
      state.caseblog = action.payload;
    },
    setAllCaseblogs: (state, action) => {
      state.allcaseblogs = action.payload;
    },
  },
});
export const { setCaseblog, setAllCaseblogs } = caseSlice.actions;
export default caseSlice.reducer;
