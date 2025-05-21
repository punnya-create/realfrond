import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  role: null, // Add role to state
  listings: [], // Add listings to state (default to empty array)
  error: null, // Optional: Add error field for future error handling
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role; // Store the role
      state.error = null; // Clear any previous errors
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null; // Reset role on logout
      state.listings = []; // Optionally reset listings
      state.error = null; // Clear any errors
    },
    setListings: (state, action) => {
      state.listings = action.payload.listings;
    },
    setTripList: (state, action) => {
      state.user.tripList = action.payload;
    },
    setWishList: (state, action) => {
      state.user.wishList = action.payload;
    },
    setPropertyList: (state, action) => {
      state.user.propertyList = action.payload;
    },
    setReservationList: (state, action) => {
      state.user.reservationList = action.payload;
    },
  },
});

export const { setLogin, setLogout, setListings, setTripList, setWishList, setPropertyList, setReservationList } =
  userSlice.actions;
export default userSlice.reducer;