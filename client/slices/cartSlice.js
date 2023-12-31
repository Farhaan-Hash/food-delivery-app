import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes

    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      let newCart = [...state.items];
      let itemIndex = state.items.findIndex(
        (item) => item._id == action.payload.id
      );
      if (itemIndex >= 0) {
        newCart.splice(itemIndex, 1);
      } else {
        console.log("can't remove item as its not in the basket");
      }
      state.items = newCart;
    },

    emptyCart: (state, action) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {addToCart, removeFromCart, emptyCart} = cartSlice.actions;
//Access root state, call cart slice and return cart value
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemsById = (state, id) =>
  state.cart.items.filter((item) => item._id == id);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => (total = total + item.price), 0);

export default cartSlice.reducer;
