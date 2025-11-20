import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import caseSlice from "./caseSlice.js";
import insightSlice from "./insightSlice.js";
import userSlice from "./userSlice.js";
import contactSlice from "./contactSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    case: caseSlice,
    insight: insightSlice,
    user: userSlice,
    contact: contactSlice,
  },
});
export default store;
