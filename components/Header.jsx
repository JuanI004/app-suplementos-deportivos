"use client";
import Image from "next/image";
import classes from "./Header.module.css";
import headerImg from "../public/images/ironfuel-header.png";
import logo from "../public/images/ironfuel-header.png";
import { useState } from "react";

export default function Header() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  function handleToggle() {
    setNavIsOpen((prev) => !prev);
  }
  return (
    <>
      <header className={classes.header}>
        <Image
          src={headerImg}
          alt="IronFuel"
          className={classes["header-img"]}
        />
        <div className={classes["toggle"]}>
          <button className={classes["toggle-button"]} onClick={handleToggle}>
            <span className={classes["toggle-button__bar"]}></span>
            <span className={classes["toggle-button__bar"]}></span>
            <span className={classes["toggle-button__bar"]}></span>
          </button>
        </div>

        <ul className={classes["nav-items"]}>
          <li>Suplementos</li>
          <li>Vitaminas</li>
          <li>Accesorios</li>
          <li>
            <button className={classes["nav-items__button"]}>
              Mi carro (0)
            </button>
          </li>
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
              <li className={classes["mobile-nav__item"]}>
                <a href="packages/index.html">Suplementos</a>
              </li>
              <li className={classes["mobile-nav__item"]}>
                <a href="customers/index.html">Vitaminas</a>
              </li>
              <li className={classes["mobile-nav__item"]}>
                <a href="customers/index.html">Accesorios</a>
              </li>
              <li className={classes["mobile-nav__item--cta"]}>
                <a href="start-hosting/index.html">Mi carro (0)</a>
              </li>
            </ul>
            <Image
              src={logo}
              alt="ironFuel logo"
              className={classes["mobile-nav__img"]}
            />
          </nav>
        </>
      )}
    </>
  );
}
