import { createSlice } from "@reduxjs/toolkit";

//Create a cart slice with initial state
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as CanvasItem[],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {

    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
          imageUrls: newItem.imageUrls,
          size: newItem.size
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeFromCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        // handle the case when existingItem is not found
        return;
      }
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        //If there's only one of this item in the cart(items array), filter it out
        state.items = state.items.filter((item) => item.id !== newItem.id);
      } else {
        //If there's more than one of this item in the cart, reduce its quantity by 1
        //and reduce its total price
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
      }
      state.totalQuantity++;
      state.changed = true;
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        }
      }
      state.totalQuantity--;
      state.changed = true;
    },
  }, 
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;