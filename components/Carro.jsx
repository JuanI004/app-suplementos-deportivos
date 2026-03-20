"use client";
import placeholderImg from "@/public/images/placeholder.webp";
import Image from "next/image";
import classes from "./Carro.module.css";
import Link from "next/link";
import Cantidad from "./Cantidad";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cart-slice";
import { useState } from "react";
import FinalizarCompra from "./FinalizarCompra";
import { useRouter } from "next/navigation";

export default function Carro({ handleToggle }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const [toggleFinalizar, setToggleFinalizar] = useState(false);
  const precioTotal = cartItems.reduce((total, item) => {
    let precio = item.precio;
    if (item.descuento) {
      precio = (item.precio * (100 - item.porcentajeDescuento)) / 100;
    }
    return total + precio * item.quantity;
  }, 0);
  function handleFinalizar() {
    handleToggle();
    router.push("/finalizar-compra");
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
        {!toggleFinalizar ? (
          <>
            {cartItems.length === 0 ? (
              <>
                {" "}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <h1>Mi carro</h1>{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    fill="#5f5f5f"
                    viewBox="0 0 256 256"
                  >
                    <path d="M104,216a16,16,0,1,1-16-16A16,16,0,0,1,104,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,192,200ZM239.71,74.14l-25.64,92.28A24.06,24.06,0,0,1,191,184H92.16A24.06,24.06,0,0,1,69,166.42L33.92,40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,7.71,5.86L57.19,64H232a8,8,0,0,1,7.71,10.14ZM221.47,80H61.64l22.81,82.14A8,8,0,0,0,92.16,168H191a8,8,0,0,0,7.71-5.86Z"></path>
                  </svg>
                  <p
                    style={{
                      color: "#5f5f5f",
                      textAlign: "center",
                      paddingBottom: "2rem",
                    }}
                  >
                    Tu carrito está vacío
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h1>Mi carro</h1>
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
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Link
                              href={`/catalogo/${item.id}`}
                              onClick={handleToggle}
                            >
                              {item.nombre}
                            </Link>
                            <Cantidad
                              cantidad={item.quantity}
                              handleIncCarro={() => handleIncCarro(item)}
                              handleDecCarro={() => handleDecCarro(item)}
                            />
                          </div>

                          <div style={{ fontSize: "0.7rem" }}>
                            <h2 style={{ color: "#96de37" }}>${precio}</h2>
                            <h3>Subtotal</h3>
                            <h2 style={{ color: "#d4d4d4" }}>
                              ${(item.quantity * precio).toFixed(2)}
                            </h2>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className={classes["cart-total"]}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h2>Total:</h2>
                    <h3>${precioTotal.toFixed(2)}</h3>
                  </div>
                  <button
                    className={classes["cart-finalizar"]}
                    onClick={handleFinalizar}
                  >
                    Finalizar Compra
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <FinalizarCompra
            precioTotal={precioTotal}
            handleToggle={handleToggle}
          />
        )}
      </div>
    </>
  );
}
