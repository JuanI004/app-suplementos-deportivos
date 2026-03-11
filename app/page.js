"use client";
import Image from "next/image";
import styles from "./page.module.css";
import titleImg from "../public/images/ironfuel-title.webp";
import img1 from "../public/images/why-choose-us1.webp";
import img2 from "../public/images/why-choose-us2.webp";
import img3 from "../public/images/why-choose-us3.webp";
import Link from "next/link";
import BarraBusqueda from "@/components/BarraBusqueda";
import { useEffect, useRef, useState } from "react";

function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: options.threshold ?? 0.5,
        rootMargin: options.rootMargin ?? "0px",
      },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}

export default function Home() {
  const { ref: ref1, isVisible: visible1 } = useScrollReveal();
  const { ref: ref2, isVisible: visible2 } = useScrollReveal();
  const { ref: ref3, isVisible: visible3 } = useScrollReveal();
  return (
    <>
      <div className={styles.banner}>
        <Image src={titleImg} alt="IronFuel" className={styles["banner-img"]} />
        <Link href="/catalogo">
          <button>Ver nuestro catálogo</button>
        </Link>
      </div>
      <div className={styles.search}>
        <h1>Encuentra tu suplemento ideal</h1>
        <BarraBusqueda />
      </div>
      <div className={styles["why-choose-us"]}>
        <h1>¿Por qué elegir IronFuel?</h1>
        <ul className={styles["why-choose-us__items"]}>
          <li
            className={
              styles["reveal-right"] + " " + (visible1 ? styles["visible"] : "")
            }
            ref={ref1}
          >
            <h3>Calidad Garantizada</h3>
            <h2>01</h2>
            <div className={styles["why-choose-us__item"]}>
              <p>
                Nuestros suplementos cumplen con los más altos estándares de
                calidad de la industria. Cada producto que ofrecemos pasa por
                rigurosos controles de calidad que verifican pureza, potencia y
                composición. No comprometemos la efectividad de nuestros
                suplementos: lo que ves en la etiqueta es exactamente lo que
                obtienes en cada porción. Trabajamos únicamente con productos
                que cuentan con certificaciones internacionales y que han sido
                fabricados en instalaciones que siguen las buenas prácticas de
                manufactura (GMP), garantizando que cada frasco, sobre o barra
                que llega a tus manos cumple con estándares farmacéuticos.
              </p>
              <Image src={img1} alt="" />
            </div>
          </li>
          <li
            ref={ref2}
            className={
              styles["why-choose-us__highlighted"] +
              " " +
              (visible2 ? styles["visible"] : "") +
              " " +
              styles["reveal-left"]
            }
          >
            <h3>Marcas de Renombre Mundial</h3>
            <h2>02</h2>
            <div className={styles["why-choose-us__item"]}>
              <Image src={img2} alt="" />
              <p>
                Colaboramos exclusivamente con las marcas más reconocidas y
                respetadas de la industria de suplementación deportiva a nivel
                global. Marcas líderes que han construido su reputación durante
                décadas gracias a la innovación, investigación científica y
                resultados comprobados. Estas marcas no solo son populares, sino
                que son la elección de atletas profesionales, culturistas de
                élite y entusiastas del fitness en todo el mundo. Al elegir
                nuestros productos, accedes al mismo nivel de calidad que
                utilizan los mejores deportistas del planeta.
              </p>
            </div>
          </li>
          <li
            ref={ref3}
            className={
              styles["reveal-right"] + " " + (visible3 ? styles["visible"] : "")
            }
          >
            <h3>Miles de Clientes Satisfechos</h3>
            <h2>03</h2>
            <div className={styles["why-choose-us__item"]}>
              <p>
                Nuestra comunidad de clientes satisfechos es nuestro mejor aval.
                Cientos de personas han transformado su físico, mejorado su
                rendimiento y alcanzado sus metas fitness gracias a nuestros
                productos y asesoramiento. Las reseñas positivas, testimonios y
                casos de éxito hablan por sí solos: desde principiantes que
                dieron sus primeros pasos en el gimnasio hasta atletas
                experimentados que buscaban ese empujón extra para superar sus
                límites. Cada día recibimos comentarios de clientes que han
                notado mejoras en su recuperación muscular, aumento de fuerza,
                pérdida de grasa o ganancia de masa magra. Tu satisfacción es
                nuestra prioridad, y trabajamos constantemente para mantener la
                confianza que has depositado en nosotros.
              </p>

              <Image src={img3} alt="" />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
