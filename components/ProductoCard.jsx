import classes from "./ProductoCard.module.css";
import placeholderImg from "@/public/images/placeholder.jpg";
import Image from "next/image";
export default function ProductoCard({ prod }) {
  let precio = prod.price;
  if (prod.descuento) {
    precio = ((prod.precio * (100 - prod.porcentajeDescuento)) / 100).toFixed(
      2,
    );
  }

  return (
    <div className={classes.card}>
      {prod.descuento && <div className={classes["sale-badge"]}>SALE</div>}
      <div className={classes["card-img"]}>
        <Image src={placeholderImg} alt={prod.nombre} />
      </div>
      <div className={classes["card-txt"]}>
        <h3>{prod.nombre}</h3>
        {!prod.descuento ? (
          <p className={classes["card-price"]}>${prod.precio}</p>
        ) : (
          <>
            <p className={classes["card-price__disabled"]}>${prod.precio}</p>
            <p className={classes["card-price"]}>${precio}</p>
          </>
        )}
        {prod.stock === 0 && <p className={classes["card-stock"]}>Sin stock</p>}
      </div>
    </div>
  );
}
