import { useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./BarraBusqueda.module.css";

export default function BarraBusqueda() {
  const busquedaInput = useRef();
  const router = useRouter();
  function handleSubmit(event) {
    event.preventDefault();
    const busqueda = busquedaInput.current.value;
    if (busqueda) {
      router.push(`/catalogo?search=${encodeURIComponent(busqueda)}`);
    }
  }
  return (
    <form className={styles["search-bar"]} onSubmit={handleSubmit}>
      <input
        ref={busquedaInput}
        type="text"
        id="searchBar"
        name="searchBar"
        placeholder="Buscar suplementos (ej: proteína whey, creatina...)"
      />
      <button type="submit">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="8"
            cy="8"
            r="6"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <line
            x1="12.5"
            y1="12.5"
            x2="18"
            y2="18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </form>
  );
}
