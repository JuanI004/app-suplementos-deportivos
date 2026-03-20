"use client";
import { Provider } from "react-redux";
import store from ".";
import { useEffect, useState, createContext, useContext } from "react";
import { cartActions } from "./slices/cart-slice";
const CargadoContext = createContext(false);
export function useCargado() {
  return useContext(CargadoContext);
}
function CartPersist({ setCargado }) {
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      const { items, totalQuantity } = JSON.parse(saved);
      store.dispatch(cartActions.loadCart({ items, totalQuantity }));
    }
    setCargado(true);
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
  const [cargado, setCargado] = useState(false);
  return (
    <Provider store={store}>
      <CargadoContext.Provider value={cargado}>
        <CartPersist setCargado={setCargado} />
        {children}
      </CargadoContext.Provider>
    </Provider>
  );
}
