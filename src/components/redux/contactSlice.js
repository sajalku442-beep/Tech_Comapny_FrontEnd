import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contact: null,
    allContacts: [],
  },
  reducers: {
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    setAllContacts: (state, action) => {
      state.allContacts = action.payload;
    },
  },
});
export const { setContact, setAllContacts } = contactSlice.actions;
export default contactSlice.reducer;
