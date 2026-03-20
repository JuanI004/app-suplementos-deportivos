"use client";
import { Provider } from "react-redux";
import store from ".";
import { useEffect } from "react";
import { cartActions } from "./slices/cart-slice";

function CartPersist() {
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      const { items, totalQuantity } = JSON.parse(saved);
      store.dispatch(cartActions.loadCart({ items, totalQuantity }));
    }
  }, []);
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const { items, totalQuantity } = store.getState().cart;
      localStorage.setItem("cart", JSON.stringify({ items, totalQuantity }));
    });
    return () => unsubscribe();
  }, []);
  return null;
}

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <CartPersist />
      {children}
    </Provider>
  );
}
