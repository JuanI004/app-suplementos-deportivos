"use client";
import { useState } from "react";
import Image from "next/image";
import placeholderImg from "@/public/images/placeholder.jpg";
import infoNutricional from "@/public/images/info-nutricional.png";
import classes from "./Imagenes.module.css";
let mayor = ">";
let menor = "<";
export default function Imagenes() {
  const [imgActual, setImgActual] = useState(0);
  function handleClickSig() {
    setImgActual((prev) => {
      if (prev === 0) {
        return prev + 1;
      }
      return prev;
    });
  }
  function handleClickAnt() {
    setImgActual((prev) => {
      if (prev === 1) {
        return prev - 1;
      }
      return prev;
    });
  }
  return (
    <div className={classes.imagen}>
      <button className={classes.sig} onClick={handleClickAnt}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="16"
            cy="16"
            r="15"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.3"
          />
          <path
            d="M18 10L12 16L18 22"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {imgActual === 0 ? (
        <Image src={placeholderImg} alt="imagen del suplemento" />
      ) : (
        <Image src={infoNutricional} alt="informacion nutricional" />
      )}
      <button className={classes.ant} onClick={handleClickSig}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="16"
            cy="16"
            r="15"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.3"
          />
          <path
            d="M14 10L20 16L14 22"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
