"use client";
import classes from "./CategoriasDrop.module.css";
import { SUBCATEGORIAS, MARCAS } from "@/utils/data";
import Link from "next/link";
import { useState } from "react";
export default function CategoriasDrop({ title, idCat, esMarca }) {
  const [dropIsClicked, setDropIsClicked] = useState(false);
  let subcategorias;
  if (esMarca) {
    subcategorias = MARCAS;
  } else {
    subcategorias = SUBCATEGORIAS.filter(
      (subcategoria) => subcategoria.categoriaId === idCat,
    );
  }

  function handleClickDrop() {
    setDropIsClicked((prev) => !prev);
  }
  return (
    <>
      <button className={classes.categoria} onClick={handleClickDrop}>
        <h3>{title}</h3>

        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={dropIsClicked ? classes.up : undefined}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {!esMarca ? (
        <div className={classes.subcategorias}>
          {dropIsClicked &&
            subcategorias.map((subcat) => (
              <Link key={subcat.id} href={`/catalogo?subcat=${subcat.nombre}`}>
                <button className={classes.subcategoria}>
                  <h3>{subcat.nombre}</h3>
                </button>
              </Link>
            ))}
        </div>
      ) : (
        <div className={classes.subcategorias}>
          {dropIsClicked &&
            subcategorias.map((subcat) => (
              <Link key={subcat.id} href={`/catalogo?marca=${subcat.nombre}`}>
                <button className={classes.subcategoria}>
                  <h3>{subcat.nombre}</h3>
                </button>
              </Link>
            ))}
        </div>
      )}
    </>
  );
}
