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
          <h2>Ver Catálogo </h2>
        </button>
      </div>

      <div className={classes.categorias}>
        <h2>Catálogo</h2>
        <p className={classes.sectionTitle}>Categorías</p>
        {CATEGORIAS.map((cat) => (
          <CategoriasDrop key={cat.id} idCat={cat.id} title={cat.nombre} />
        ))}
      </div>
      <p className={classes.sectionTitle}>Marcas</p>
      <div className={classes.marcas}>
        <CategoriasDrop title="Ver Todas" esMarca />
      </div>
      <div className={classes.filtrar}>
        <p>Ordenar por: </p>
        <Filtros />
      </div>
    </>
  );
}
