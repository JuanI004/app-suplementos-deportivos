"use client";
import { useState, useEffect } from "react";
import classes from "./Filtros.module.css";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
export default function Filtros() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ordenActual = searchParams.get("precio");
  const [selected, setSelected] = useState(
    ordenActual === "ba"
      ? "ORDENAR POR PRECIO: BAJO A ALTO"
      : ordenActual === "ab"
        ? "ORDENAR POR PRECIO: ALTO A BAJO"
        : "ORDENAR POR PRECIO",
  );
  const options = [
    { id: "ba", item: "ORDENAR POR PRECIO: BAJO A ALTO" },
    { id: "ab", item: "ORDENAR POR PRECIO: ALTO A BAJO" },
  ];
  function construirUrl(id) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("precio", id);
    return `${pathname}?${params.toString()}`;
  }
  const handleClick = (option) => {
    setSelected(option.item);
    setIsOpen(false);
  };
  useEffect(() => {
    if (!ordenActual) {
      setSelected("ORDENAR POR PRECIO");
    }
  }, [ordenActual]);
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
              <Link
                onClick={() => handleClick(option)}
                href={construirUrl(option.id)}
              >
                {option.item}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
