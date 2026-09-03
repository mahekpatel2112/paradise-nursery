import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',

  initialState: {
    items: [],
  },

  reducers: {
    // Add product to cart
    addItem: (state, action) => {
      const item = action.payload;

      const existingItem = state.items.find(
        (product) => product.name === item.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...item,
          quantity: 1,
        });
      }
    },

    // Remove product from cart
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.name !== action.payload
      );
    },

    // Update product quantity
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      const item = state.items.find(
        (product) => product.name === name
      );

      if (item) {
        item.quantity = quantity;

        // Remove item if quantity becomes 0 or less
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (product) => product.name !== name
          );
        }
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;
