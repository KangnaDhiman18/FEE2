import { createSlice } from "@reduxjs/toolkit";

const savedCart = (() => {
  try {
    const value = localStorage.getItem("noirvault-cart");
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
})();

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: savedCart },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((product) => product.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((product) => product.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      else if (item) state.items = state.items.filter((product) => product.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
