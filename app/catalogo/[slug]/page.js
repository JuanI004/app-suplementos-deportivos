import classes from "./page.module.css";
import Imagenes from "@/components/Imagenes";
import AgregarCarro from "@/components/AgregarCarro";
import ProductoCard from "@/components/ProductoCard";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
export default async function PagProducto({ params }) {
  const { slug } = await params;

  const { data: prod, error } = await supabase
    .from("supplements")
    .select("*")
    .eq("id", slug)
    .single();
  const { data: mismaMarca } = await supabase
    .from("supplements")
    .select("*")
    .eq("categoria", prod.categoria)
    .eq("marca", prod.marca)
    .neq("id", slug)
    .limit(4);
  const necesitaMas = 4 - (mismaMarca?.length ?? 0);
  let otrasMarcas = [];
  if (necesitaMas > 0) {
    const { data: otras } = await supabase
      .from("supplements")
      .select("*")
      .eq("categoria", prod.categoria)
      .neq("marca", prod.marca)
      .neq("id", slug)
      .limit(necesitaMas);
    otrasMarcas = otras ?? [];
  }

  const relacionados = [...(mismaMarca ?? []), ...(otrasMarcas ?? [])];

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
      <div className={classes["prods-relacionados"]}>
        <div className={classes["prods-relacionados__header"]}>
          <h2>Productos relacionados</h2>
          <p>{prod.categoria}</p>
        </div>

        <div>
          <ul className={classes["prods-relacionados__list"]}>
            {relacionados.map((prodRel) => (
              <li key={prodRel.id} className={classes.producto}>
                <Link href={`/catalogo/${prodRel.id}`}>
                  <ProductoCard
                    prod={prodRel}
                    marca={prodRel.marca === prod.marca && prod.marca}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
