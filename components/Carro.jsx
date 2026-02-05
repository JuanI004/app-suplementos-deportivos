import placeholderImg from "@/public/images/placeholder.jpg";
import Image from "next/image";
import classes from "./Carro.module.css";
import Link from "next/link";
import Cantidad from "./Cantidad";
export default function Carro({ handleToggle }) {
  let cantidad1 = 3;
  let precio1 = "76.49";
  let cantidad2 = 1;
  let precio2 = "89.99";
  let cantidad3 = 2;
  let precio3 = "71.99";

  //   function handleIncCarro() {
  //     setCantidad((prev) => {
  //       if (prev < stock) {
  //         return prev + 1;
  //       }
  //       return prev;
  //     });
  //   }

  //   function handleDecCarro() {
  //     setCantidad((prev) => {
  //       if (prev > 1) {
  //         return prev - 1;
  //       }
  //       return prev;
  //     });
  //   }
  return (
    <>
      <div className={classes.backdrop}></div>
      <div className={classes.cart}>
        <button className={classes["close-button"]} onClick={handleToggle}>
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
        <h1>Mi carro</h1>
        <ul className={classes["cart-items"]}>
          <li className={classes["cart-item"]}>
            <Image src={placeholderImg} alt="imagen" />
            <Link href="/catalogo/1" onClick={handleToggle}>
              Whey Protein Isolate Chocolate
            </Link>
            <h2>${precio1}</h2>
            <Cantidad cantidad={cantidad1} />
            <div>
              <h3>Subtotal</h3>
              <h2>${(cantidad1 * precio1).toFixed(2)}</h2>
            </div>
          </li>
          <li className={classes["cart-item"]}>
            <Image src={placeholderImg} alt="imagen" />
            <Link href="/catalogo/2" onClick={handleToggle}>
              Whey Protein Isolate Vainilla
            </Link>
            <h2>${precio2}</h2>
            <Cantidad cantidad={cantidad2} />
            <div>
              <h3>Subtotal</h3>
              <h2>${(cantidad2 * precio2).toFixed(2)}</h2>
            </div>
          </li>
          <li className={classes["cart-item"]}>
            <Image src={placeholderImg} alt="imagen" />
            <Link href="/catalogo/4" onClick={handleToggle}>
              Proteina Vegana de Guisante y Arroz
            </Link>
            <h2>${precio3}</h2>
            <Cantidad cantidad={cantidad3} />
            <div>
              <h3>Subtotal</h3>
              <h2>${(cantidad3 * precio3).toFixed(2)}</h2>
            </div>
          </li>
        </ul>
        <div className={classes["cart-total"]}>
          <h2>Precio Total:</h2>
          <h1>$463,45</h1>
        </div>
        <button className={classes["cart-finalizar"]}>Finalizar Compra</button>
      </div>
    </>
  );
}
