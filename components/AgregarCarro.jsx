"use client";
import { useState } from "react";
import classes from "./AgregarCarro.module.css";
import Cantidad from "./Cantidad";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cart-slice";

export default function AgregarCarro({ stock, item }) {
  const dispatch = useDispatch();
  const [cantidad, setCantidad] = useState(1);
  function handleIncCarro() {
    setCantidad((prev) => {
      if (prev < stock) {
        return prev + 1;
      }
      return prev;
    });
  }

  function handleDecCarro() {
    setCantidad((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  }
  function handleAddToCart() {
    dispatch(
      cartActions.addItemToCart({
        id: item.id,
        quantity: cantidad,
        nombre: item.nombre,
        imagen: item.imagen,
        precio: item.precio,
        descuento: item.descuento,
        porcentajeDescuento: item.porcentajeDescuento,
        stock: item.stock,
      }),
    );
    setCantidad(1);
  }
  return (
    <div className={classes["carro"]}>
      <Cantidad
        cantidad={cantidad}
        handleIncCarro={handleIncCarro}
        handleDecCarro={handleDecCarro}
      />
      <button className={classes["agregar-carro"]} onClick={handleAddToCart}>
        <p>Agregar al carrito</p>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginLeft: "8px" }}
        >
          <circle cx="9" cy="20" r="1.5" fill="currentColor" />
          <circle cx="18" cy="20" r="1.5" fill="currentColor" />
          <path
            d="M1 1H4L6.5 13.5H19.5L22 5H6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>
    </div>
  );
}
