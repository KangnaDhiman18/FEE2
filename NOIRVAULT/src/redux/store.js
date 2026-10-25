import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});

store.subscribe(() => {
  try {
    localStorage.setItem("noirvault-cart", JSON.stringify(store.getState().cart.items));
  } catch {
    // The cart still works for the current session if storage is unavailable.
  }
});
