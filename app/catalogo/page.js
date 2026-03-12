"use client";
import ProductoCard from "@/components/ProductoCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

let PROD_X_PAG = 10;
import classes from "./page.module.css";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Catalogo() {
  const searchParams = useSearchParams();
  const categoriaParams = searchParams.get("cat");
  const subcategoriaParams = searchParams.get("subcat");
  const marcaParams = searchParams.get("marca");
  const busquedaParams = searchParams.get("search");
  const precioParams = searchParams.get("precio");
  const [pagActual, setPagActual] = useState(1);
  const [suplementos, setSuplementos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSuplementos() {
      const { data, error } = await supabase.from("supplements").select("*");
      if (error) {
        console.error("Error al obtener suplementos:", error);
        setError(error);
      } else {
        setSuplementos(data);
      }
      setLoading(false);
    }
    fetchSuplementos();
  }, []);
  const productosFiltrados = useMemo(() => {
    let resultado = suplementos;
    if (busquedaParams != null && busquedaParams.trim() !== "") {
      const query = busquedaParams.toLowerCase().trim();
      resultado = resultado.filter((item) => {
        const matchNombre = item.nombre?.toLowerCase().includes(query);
        const matchDesc = item.descripcion?.toLowerCase().includes(query);
        const matchCat = item.categoria?.toLowerCase().includes(query);
        const matchSubcat = item.subcategoria?.toLowerCase().includes(query);
        const matchMarca = item.marca?.toLowerCase().includes(query);
        const vegano = query === "vegano" && item.vegano;
        return (
          matchNombre ||
          matchDesc ||
          matchCat ||
          matchSubcat ||
          matchMarca ||
          vegano
        );
      });
    }
    if (categoriaParams != null) {
      resultado = resultado.filter(
        (item) => item.categoria === categoriaParams,
      );
    }
    if (subcategoriaParams != null) {
      resultado = resultado.filter(
        (item) => item.subcategoria === subcategoriaParams,
      );
    }
    if (marcaParams != null) {
      resultado = resultado.filter((item) => item.marca === marcaParams);
    }
    if (precioParams != null) {
      resultado = [...resultado].sort((a, b) => {
        let precioA = a.precio;
        let precioB = b.precio;
        if (a.descuento) {
          precioA = ((a.precio * (100 - a.porcentajeDescuento)) / 100).toFixed(
            2,
          );
        }
        if (b.descuento) {
          precioB = ((b.precio * (100 - b.porcentajeDescuento)) / 100).toFixed(
            2,
          );
        }
        if (precioParams === "ba") {
          return precioA - precioB;
        } else if (precioParams === "ab") {
          return precioB - precioA;
        }
        return 0;
      });
    }
    return resultado;
  }, [
    suplementos,
    categoriaParams,
    subcategoriaParams,
    marcaParams,
    busquedaParams,
    precioParams,
  ]);
  useEffect(() => {
    setPagActual(1);
  }, [categoriaParams, subcategoriaParams]);
  const inicio = (pagActual - 1) * PROD_X_PAG;
  const fin = inicio + PROD_X_PAG;
  const productos = productosFiltrados.slice(inicio, fin);
  const numTotal = Math.ceil(productosFiltrados.length / PROD_X_PAG);
  const numeros = Array.from({ length: numTotal }, (_, i) => i + 1);
  function handlePageClick(num) {
    setPagActual(num);
  }
  function handleIncClick() {
    setPagActual((prev) => prev + 1);
  }
  function handleDecClick(num) {
    setPagActual((prev) => prev - 1);
  }
  if (loading) {
    return (
      <div className={classes.cargando}>
        <div className={classes.spinner}></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className={classes.noResultados}>
        <p>
          Error al cargar los productos. Por favor, inténtalo de nuevo más
          tarde.
        </p>
        <Link href="/">
          <button>Volver al inicio</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {productos.length === 0 ? (
        <div className={classes.noResultados}>
          <p>
            {busquedaParams
              ? `No se encontraron productos para "${busquedaParams}"`
              : "No se encontraron productos con estos filtros"}
          </p>
          <Link href="/catalogo">
            <button>Ver todos los productos</button>
          </Link>
        </div>
      ) : (
        <>
          <div>
            <ul className={classes.productos}>
              {productos.map((prod) => {
                return (
                  <li key={prod.id} className={classes.producto}>
                    <Link href={`/catalogo/${prod.id}`}>
                      <ProductoCard prod={prod} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={classes.indices}>
            <ul>
              {pagActual !== 1 && (
                <li>
                  <button onClick={handleDecClick}>{"<"}</button>
                </li>
              )}
              {numeros.map((index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePageClick(index)}
                    className={pagActual === index ? classes.active : undefined}
                  >
                    {index}
                  </button>
                </li>
              ))}
              {pagActual !== numTotal && (
                <li>
                  <button onClick={handleIncClick}>{">"}</button>
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
