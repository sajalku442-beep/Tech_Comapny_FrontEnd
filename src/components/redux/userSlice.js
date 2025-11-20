import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    removeUser: (state, action) => {
      state.allUsers = state.allUsers.filter((u) => u._id !== action.payload);
    },
  },
});

export const { setUsers, removeUser } = userSlice.actions;
export default userSlice.reducer;
