"use client";
import ProductoCard from "@/components/ProductoCard";
import { DUMMY_PRODUCTS } from "@/utils/data";
import Image from "next/image";
import { useState } from "react";
let PROD_X_PAG = 10;
import classes from "./page.module.css";
let menor = "<";
let mayor = ">";
export default function Catalogo() {
  const [pagActual, setPagActual] = useState(1);
  const inicio = (pagActual - 1) * PROD_X_PAG;
  const fin = inicio + PROD_X_PAG;
  const productos = DUMMY_PRODUCTS.slice(inicio, fin);
  const numTotal = Math.ceil(DUMMY_PRODUCTS.length / PROD_X_PAG);
  const numeros = Array.from({ length: numTotal }, (_, i) => i + 1);
  function handlePageClick(num) {
    setPagActual(num);
  }
  function handleIncClick() {
    setPagActual((prev) => prev + 1);
  }
  function handleDecClick(num) {
    setPagActual((prev) => prev - 1);
  }
  return (
    <>
      <div>
        <ul className={classes.productos}>
          {productos.map((prod) => {
            return (
              <li key={prod.id} className={classes.producto}>
                <ProductoCard prod={prod} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className={classes.indices}>
        <ul>
          {pagActual !== 1 && (
            <li>
              <button onClick={handleDecClick}>{menor}</button>
            </li>
          )}
          {numeros.map((index) => (
            <li key={index}>
              <button
                onClick={() => handlePageClick(index)}
                className={pagActual === index ? classes.active : undefined}
              >
                {index}
              </button>
            </li>
          ))}
          {pagActual !== numTotal && (
            <li>
              <button onClick={handleIncClick}>{mayor}</button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
