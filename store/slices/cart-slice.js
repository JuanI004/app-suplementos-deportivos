import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0 },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity += newItem.quantity;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          quantity: newItem.quantity,
          nombre: newItem.nombre,
          imagen: newItem.imagen,
          precio: newItem.precio,
          descuento: newItem.descuento,
          porcentajeDescuento: newItem.porcentajeDescuento,
          stock: newItem.stock,
        });
      } else {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice =
          existingItem.totalPrice + (newItem.price + newItem.quantity);
      }
    },
    removeItemToCart(state, action) {
      const id = action.payload;
      const exisitingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (exisitingItem) {
        if (exisitingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          exisitingItem.quantity--;
          exisitingItem.totalPrice =
            exisitingItem.totalPrice - exisitingItem.price;
        }
      }
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice;
