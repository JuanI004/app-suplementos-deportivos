"use client";
import { useState } from "react";
import classes from "./AgregarCarro.module.css";

export default function AgregarCarro({ stock }) {
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
  return (
    <div className={classes["carro"]}>
      <div className={classes["cant"]}>
        <button onClick={handleDecCarro} className={classes["dec"]}>
          -
        </button>
        <p>{cantidad}</p>
        <button onClick={handleIncCarro} className={classes["inc"]}>
          +
        </button>
      </div>
      <button className={classes["agregar-carro"]}>
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
