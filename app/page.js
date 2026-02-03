import Image from "next/image";
import styles from "./page.module.css";
import titleImg from "../public/images/ironfuel-title.png";
import img1 from "../public/images/why-choose-us1.png";
import img2 from "../public/images/why-choose-us2.jpg";
import img3 from "../public/images/why-choose-us3.jpg";
import Link from "next/link";

export default function Home() {
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
        <form className={styles["search-bar"]}>
          <input
            type="text"
            id="searchBar"
            name="searchBar"
            placeholder="Buscar suplementos (ej: proteína whey, creatina...)"
          />
          <button type="button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
              <line
                x1="12.5"
                y1="12.5"
                x2="18"
                y2="18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </form>
      </div>
      <div className={styles["why-choose-us"]}>
        <h1>¿Por qué elegir IronFuel?</h1>
        <ul className={styles["why-choose-us__items"]}>
          <li>
            <h3>Calidad Garantizada</h3>
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
          <li className={styles["why-choose-us__highlighted"]}>
            <h3>Marcas de Renombre Mundial</h3>
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
          <li>
            <h3>Miles de Clientes Satisfechos</h3>
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
