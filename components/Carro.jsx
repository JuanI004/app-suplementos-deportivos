"use client";
import placeholderImg from "@/public/images/placeholder.jpg";
import Image from "next/image";
import classes from "./Carro.module.css";
import Link from "next/link";
import Cantidad from "./Cantidad";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cart-slice";
import { useState } from "react";
import FinalizarCompra from "./FinalizarCompra";

export default function Carro({ handleToggle }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [toggleFinalizar, setToggleFinalizar] = useState(false);
  const precioTotal = cartItems.reduce((total, item) => {
    let precio = item.precio;
    if (item.descuento) {
      precio = (item.precio * (100 - item.porcentajeDescuento)) / 100;
    }
    return total + precio * item.quantity;
  }, 0);
  function handleToggleFinalizar() {
    setToggleFinalizar((prev) => !prev);
  }
  function handleIncCarro(item) {
    dispatch(
      cartActions.addItemToCart({
        id: item.id,
        quantity: 1,
        nombre: item.nombre,
        imagen: item.imagen,
        precio: item.precio,
        descuento: item.descuento,
        porcentajeDescuento: item.porcentajeDescuento,
        stock: item.stock,
      }),
    );
  }
  function handleDecCarro(item) {
    dispatch(cartActions.removeItemToCart(item.id));
  }
  return (
    <>
      <div className={classes.backdrop}></div>
      <div className={classes.cart}>
        {!toggleFinalizar ? (
          <>
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
            {cartItems.length === 0 ? (
              <p
                style={{ color: "white", textAlign: "center", padding: "2rem" }}
              >
                Tu carrito está vacío
              </p>
            ) : (
              <>
                <ul className={classes["cart-items"]}>
                  {cartItems.map((item) => {
                    let precio = item.precio;
                    if (item.descuento) {
                      precio = (
                        (item.precio * (100 - item.porcentajeDescuento)) /
                        100
                      ).toFixed(2);
                    }

                    return (
                      <li key={item.id} className={classes["cart-item"]}>
                        <Image src={placeholderImg} alt="imagen" />
                        <Link
                          href={`/catalogo/${item.id}`}
                          onClick={handleToggle}
                        >
                          {item.nombre}
                        </Link>
                        <h2>${precio}</h2>
                        <Cantidad
                          cantidad={item.quantity}
                          handleIncCarro={() => handleIncCarro(item)}
                          handleDecCarro={() => handleDecCarro(item)}
                        />
                        <div>
                          <h3>Subtotal</h3>
                          <h2>${(item.quantity * precio).toFixed(2)}</h2>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className={classes["cart-total"]}>
                  <h2>Precio Total:</h2>
                  <h1>${precioTotal.toFixed(2)}</h1>
                </div>
                <button
                  className={classes["cart-finalizar"]}
                  onClick={handleToggleFinalizar}
                >
                  Finalizar Compra
                </button>
              </>
            )}
          </>
        ) : (
          <FinalizarCompra precioTotal={precioTotal} />
        )}
      </div>
    </>
  );
}
