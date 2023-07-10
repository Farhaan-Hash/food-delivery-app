import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  restaurant: null,
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes

    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setRestaurant} = restaurantSlice.actions;
//Access root state, call restaurant slice and return restaurant value
export const selectRestaurant = (state) => state.restaurant.restaurant;

export default restaurantSlice.reducer;
