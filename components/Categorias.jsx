"use client";
import CategoriasDrop from "./CategoriaDrop";
import classes from "./Categorias.module.css";
import { CATEGORIAS } from "@/utils/data";
import Filtros from "./Filtros";

export default function Categorias({ handleClick }) {
  return (
    <>
      <div className={classes.mobile}>
        <button onClick={handleClick}>
          <h2>Ver Categorías </h2>
        </button>
      </div>

      <div className={classes.categorias}>
        <h2>Categorías</h2>
        {CATEGORIAS.map((cat) => (
          <CategoriasDrop key={cat.id} idCat={cat.id} title={cat.nombre} />
        ))}
      </div>
      <div className={classes.marcas}>
        <CategoriasDrop title="Marcas" esMarca />
      </div>
      <div className={classes.filtrar}>
        <p>Ordenar por: </p>
        <Filtros />
      </div>
    </>
  );
}
