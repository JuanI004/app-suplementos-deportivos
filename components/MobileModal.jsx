import CategoriasDrop from "./CategoriaDrop";
import Filtros from "./Filtros";
import classes from "./MobileModal.module.css";
import { CATEGORIAS } from "@/utils/data";
export default function MobileModal({ handleClick }) {
  return (
    <div className={classes.mobile}>
      <button className={classes["close-button"]} onClick={handleClick}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 7L7 25M7 7L25 25"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className={classes["mobile-categorias"]}>
        <h2>Catálogo</h2>
        <p className={classes.sectionTitle}>Categorías</p>
        {CATEGORIAS.map((cat) => (
          <CategoriasDrop key={cat.id} idCat={cat.id} title={cat.nombre} />
        ))}
      </div>
      <div className={classes["mobile-marcas"]}>
        <p className={classes.sectionTitle}>Marcas</p>
        <CategoriasDrop title="Ver Todas" esMarca />
      </div>
      <div className={classes["mobile-filtrar"]}>
        <p>Ordenar por: </p>
        <Filtros />
      </div>
    </div>
  );
}
