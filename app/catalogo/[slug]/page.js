import classes from "./page.module.css";
import Imagenes from "@/components/Imagenes";
import AgregarCarro from "@/components/AgregarCarro";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
export default async function PagProducto({ params }) {
  const { slug } = await params;
  const { data: prod, error } = await supabase
    .from("supplements")
    .select("*")
    .eq("id", slug)
    .single();

  let precio = prod.precio;
  if (prod.descuento) {
    precio = ((prod.precio * (100 - prod.porcentajeDescuento)) / 100).toFixed(
      2,
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
      <Link href="/catalogo" className={classes.volver}>
        Volver al catálogo
      </Link>
      <div className={classes.prod}>
        <Imagenes />
        <div className={classes["prod-info"]}>
          <h1>{prod.nombre}</h1>
          <div className={classes.cats}>
            <div>
              <p className={classes["cat__badge"]}>{prod.categoria}</p>
            </div>
            <div className={classes["cat__badge"]}>
              <p>{prod.subcategoria}</p>
            </div>
            <div className={classes["cat__badge"]}>
              <p>{prod.vegano ? "Vegano" : "No Vegano"}</p>
            </div>
            <div className={classes["cat__badge"]}>
              <p>{prod.marca}</p>
            </div>
          </div>
          <p className={classes["prod-desc"]}>{prod.description}</p>
          {prod.stock !== 0 ? (
            <>
              {!prod.descuento ? (
                <h2 className={classes["prod-price"]}>${prod.precio}</h2>
              ) : (
                <div className={classes["prod-prices"]}>
                  <h2 className={classes["prod-price__disabled"]}>
                    ${prod.precio}
                  </h2>
                  <h2 className={classes["prod-price"]}>${precio}</h2>
                </div>
              )}
              <AgregarCarro stock={prod.stock} item={prod} />
            </>
          ) : (
            <h2 className={classes["prod-stock"]}>Sin Stock</h2>
          )}
        </div>
      </div>
    </>
  );
}
