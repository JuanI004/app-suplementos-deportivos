import Image from "next/image";
import styles from "./page.module.css";
import bannerImg from "../public/images/banner-img.png";

export default function Home() {
  return (
    <>
      <div className="banner">
        <Image src={bannerImg} alt="Shaker de proteina" />
        <h1 className="banner-title">IronFuel</h1>
        <h3 className="banner-subtitle">
          El combustible que tu cuerpo necesita para superar cada entrenamiento.
        </h3>
      </div>
      <button>Ver nuestro catalogo</button>
      <div>
        <h2>¿Por qué elegir IronFuel?</h2>
        <ul>
          <li>
            <h3>Calidad garantizada</h3>
            <p>
              Trabajamos con suplementos de marcas reconocidas y fórmulas
              confiables, pensadas para maximizar fuerza, rendimiento y
              recuperación.
            </p>
          </li>
          <li>
            <h3>Calidad garantizada</h3>
            <p>
              Trabajamos con suplementos de marcas reconocidas y fórmulas
              confiables, pensadas para maximizar fuerza, rendimiento y
              recuperación.
            </p>
            <li>
              <h3>Resultados reales</h3>
              <p>
                Nuestros productos están orientados a objetivos concretos: ganar
                masa muscular, mejorar el desempeño deportivo y optimizar la
                recuperación post-entreno.
              </p>
            </li>
            <li>
              <h3>Testeados en los mejores laboratorios</h3>
              <p>
                Nuestros productos son analizados y verificados en laboratorios
                de primer nivel, asegurando pureza, seguridad y efectividad en
                cada lote.
              </p>
            </li>
            <li>
              <h3>Para quienes entrenan en serio</h3>
              <p>
                IronFuel está pensada para personas comprometidas con su
                progreso, desde quienes recién comienzan hasta atletas
                avanzados.
              </p>
            </li>
            <li>
              <h3>Experiencia y pasión por el fitness</h3>
              <p>
                No somos solo una tienda: somos parte de la comunidad fitness y
                entendemos lo que implica mejorar día a día.
              </p>
            </li>
          </li>
        </ul>
      </div>
    </>
  );
}
