import Image from "next/image";
import classes from "./page.module.css";
import placeholderImg from "@/public/images/placeholder.jpg";
import { DUMMY_PRODUCTS } from "@/utils/data";
import AgregarCarro from "@/components/AgregarCarro";
export default async function PagProducto({ params }) {
  const { slug } = await params;
  let prod = DUMMY_PRODUCTS.find((item) => item.id == slug);
  let precio = prod.price;
  if (prod.descuento) {
    precio = ((prod.precio * (100 - prod.porcentajeDescuento)) / 100).toFixed(
      2,
    );
  }
  return (
    <div className={classes.prod}>
      <Image src={placeholderImg} alt={prod.nombre} />
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
        </div>
        <p className={classes["prod-desc"]}>{prod.descripcion}</p>
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
            <AgregarCarro stock={prod.stock} />
          </>
        ) : (
          <h2>Sin Stock</h2>
        )}
      </div>
    </div>
  );
}
