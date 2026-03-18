"use client";
import Image from "next/image";
import classes from "./Header.module.css";
import headerImg from "../public/images/ironfuel-header.webp";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Carro from "./Carro";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    async function fetchSession() {
      supabase.auth.getSession().then(async ({ data, error }) => {
        if (!error && data.session) {
          setSession(data.session ?? null);
        }
      });
    }
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [catMenuIsOpen, setCatMenuIsOpen] = useState(false);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  function handleToggle() {
    setNavIsOpen((prev) => !prev);
  }
  function handleToggleCart() {
    setCartIsOpen((prev) => !prev);
  }
  async function handleCerrarSesion() {
    await supabase.auth.signOut();
  }
  return (
    <>
      <header className={classes.header}>
        <Link href="/">
          <Image
            src={headerImg}
            alt="IronFuel"
            className={classes["header-img"]}
          />
        </Link>

        <div className={classes["toggle"]}>
          <button className={classes["toggle-button"]} onClick={handleToggle}>
            <span className={classes["toggle-button__bar"]}></span>
            <span className={classes["toggle-button__bar"]}></span>
            <span className={classes["toggle-button__bar"]}></span>
          </button>
        </div>

        <ul className={classes["nav-items"]}>
          {session ? (
            <>
              <li
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                  position: "relative",
                }}
                onClick={() => setCatMenuIsOpen((prev) => !prev)}
              >
                <a>Catálogo</a>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={catMenuIsOpen ? classes.up : undefined}
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <ul
                  className={`${classes["nav-items__submenu"]} ${
                    catMenuIsOpen ? classes["submenu-visible"] : ""
                  }`}
                >
                  <li>
                    <Link href="/catalogo?cat=Suplementos">Suplementos</Link>
                  </li>
                  <li>
                    <Link href="/catalogo?cat=Vitaminas">Vitaminas</Link>
                  </li>
                  <li>
                    <Link href="/catalogo?cat=Accesorios">Accesorios</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/perfil">Mi Perfil</Link>
              </li>
              <li>
                <a onClick={handleCerrarSesion} style={{ cursor: "pointer" }}>
                  Cerrar Sesión
                </a>
              </li>
              <li>
                <button
                  className={classes["nav-items__button"]}
                  onClick={handleToggleCart}
                >
                  Mi carro ({totalQuantity})
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Iniciar Sesión</Link>
              </li>
              <li>
                <Link href="/signup">
                  <button className={classes["nav-items__button"]}>
                    Crear Cuenta
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
      {navIsOpen && (
        <>
          <div className={classes.backdrop}></div>
          <nav className={classes["mobile-nav"]}>
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
            <ul className={classes["mobile-nav__items"]}>
              {session ? (
                <>
                  <li
                    className={classes["mobile-nav__item"]}
                    onClick={() => {
                      setCatMenuIsOpen((prev) => !prev);
                    }}
                  >
                    <a
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        cursor: "pointer",
                      }}
                    >
                      Catálogo
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={catMenuIsOpen ? classes.up : undefined}
                      >
                        <path
                          d="M4 6L8 10L12 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                    <ul
                      className={`${classes["mobile-nav__submenu"]} ${
                        catMenuIsOpen
                          ? classes["mobile-nav__submenu--visible"]
                          : ""
                      }`}
                    >
                      <li className={classes["submenu__item"]}>
                        <Link
                          href="/catalogo?cat=Suplementos"
                          onClick={handleToggle}
                        >
                          Suplementos
                        </Link>
                      </li>
                      <li className={classes["submenu__item"]}>
                        <Link
                          href="/catalogo?cat=Vitaminas"
                          onClick={handleToggle}
                        >
                          Vitaminas
                        </Link>
                      </li>
                      <li className={classes["submenu__item"]}>
                        <Link
                          href="/catalogo?cat=Accesorios"
                          onClick={handleToggle}
                        >
                          Accesorios
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className={classes["mobile-nav__item"]}>
                    <Link href="/perfil" onClick={handleToggle}>
                      Mi Perfil
                    </Link>
                  </li>
                  <li className={classes["mobile-nav__item"]}>
                    <a
                      onClick={handleCerrarSesion}
                      style={{ cursor: "pointer" }}
                    >
                      Cerrar Sesión
                    </a>
                  </li>
                  <li className={classes["mobile-nav__item--cta"]}>
                    <a
                      onClick={() => {
                        handleToggle();
                        handleToggleCart();
                      }}
                    >
                      Mi carro ({totalQuantity})
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className={classes["mobile-nav__item"]}>
                    <Link href="/login" onClick={handleToggle}>
                      Iniciar Sesión
                    </Link>
                  </li>
                  <li className={classes["mobile-nav__item"]}>
                    <Link href="/signup" onClick={handleToggle}>
                      Crear Cuenta
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <Image
              src={headerImg}
              alt="ironFuel logo"
              className={classes["mobile-nav__img"]}
            />
          </nav>
        </>
      )}
      {cartIsOpen && <Carro handleToggle={handleToggleCart} />}
    </>
  );
}
