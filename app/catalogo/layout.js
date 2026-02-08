"use client";
import Categorias from "@/components/Categorias";
import classes from "./layout.module.css";
import { useState } from "react";
import MobileModal from "@/components/MobileModal";
import BarraBusqueda from "@/components/BarraBusqueda";

export default function CatalogoLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  function handleClick() {
    setIsOpen((prev) => !prev);
  }
  return (
    <div className={classes.content}>
      <div className={classes.header}>
        <h1>Productos</h1>
        <BarraBusqueda />
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
