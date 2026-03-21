"use client";
import { useState } from "react";
import Image from "next/image";
import { PRODUCT_IMAGES } from "@/utils/data";
import classes from "./Imagenes.module.css";
let mayor = ">";
let menor = "<";
export default function Imagenes({ img, infoNutricionalImg }) {
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
      {infoNutricionalImg !== null && (
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
      )}
      {imgActual === 0 && (
        <Image
          src={PRODUCT_IMAGES[img]}
          width={500}
          height={500}
          alt="imagen del suplemento"
        />
      )}
      {infoNutricionalImg !== null && imgActual === 1 && (
        <Image
          src={infoNutricionalImg}
          width={500}
          height={500}
          alt="informacion nutricional"
        />
      )}
      {infoNutricionalImg !== null && (
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
      )}
    </div>
  );
}
