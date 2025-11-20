import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    token: null,
    authenticate: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAuthenticate: (state, action) => {
      state.authenticate = action.payload;
    },
  },
});
export const { setLoading, setUser, setToken, setAuthenticate } =
  authSlice.actions;
export default authSlice.reducer;
