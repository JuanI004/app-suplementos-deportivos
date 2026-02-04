"use client";
import Categorias from "@/components/Categorias";
import classes from "./layout.module.css";
import { useState } from "react";
import MobileModal from "@/components/MobileModal";

export default function CatalogoLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  function handleClick() {
    setIsOpen((prev) => !prev);
  }
  return (
    <div className={classes.content}>
      <div className={classes.header}>
        <h1>Productos</h1>
        <form className={classes["search-bar"]}>
          <input
            type="text"
            id="searchBar"
            name="searchBar"
            placeholder="Buscar suplementos (ej: proteína whey, creatina...)"
          />
          <button type="button">
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
                stroke="#1d1d1d"
                strokeWidth="2"
                fill="none"
              />
              <line
                x1="12.5"
                y1="12.5"
                x2="18"
                y2="18"
                stroke="#1d1d1d"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </form>
      </div>

      <div className={classes.side}>
        <Categorias handleClick={handleClick} />
      </div>
      {isOpen && (
        <>
          <div className={classes.backdrop}></div>
          <div className={classes.modal}>
            <MobileModal handleClick={handleClick} />
          </div>
        </>
      )}
      <div className={classes.main}>{children}</div>
    </div>
  );
}
