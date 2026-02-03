"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart-slice.js";
const store = configureStore({ reducer: cartSlice.reducer });
export default store;
