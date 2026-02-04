"use client";
import { useState } from "react";
import classes from "./Filtros.module.css";
export default function Filtros() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("ORDENAR POR PRECIO");
  const options = [
    "ORDENAR POR PRECIO",
    "ORDENAR POR PRECIO: BAJO A ALTO",
    "ORDENAR POR PRECIO: ALTO A BAJO",
  ];
  const handleClick = (option) => {
    setSelected(option);
    setIsOpen(false);
  };
  return (
    <div className={classes.filtros}>
      <button
        className={classes["filtros-btn"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <span className={classes.flecha}>{isOpen ? " ▲" : " ▼"}</span>
      </button>
      {isOpen && (
        <ul className={classes["filtros-menu"]}>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleClick(option)}
              className={classes["filtro"]}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
