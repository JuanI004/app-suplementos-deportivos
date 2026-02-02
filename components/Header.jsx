import Image from "next/image";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <header className={classes.header}>
      <h1>IronFuel</h1>
      <ul className={classes["nav-items"]}>
        <li>Suplementos</li>
        <li>Vitaminas</li>
        <li>Accesorios</li>
        <li>
          <button className={classes["nav-items__button"]}>Mi carro (0)</button>
        </li>
      </ul>
    </header>
  );
}
