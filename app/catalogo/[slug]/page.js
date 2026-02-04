import Image from "next/image";
import classes from "./page.module.css";
import placeholderImg from "@/public/images/placeholder.jpg";
import { DUMMY_PRODUCTS } from "@/utils/data";
export default function PagProducto({ params }) {
  const id = params.id;
  let product = DUMMY_PRODUCTS.find((item) => item.id == id);
  console.log(id);
  return (
    <div className={classes.producto}>
      {/* <Image src={placeholderImg} alt={product.nombre} /> */}
      <div className={classes["producto-info"]}>
        {/* <h1>{product.nombre}</h1> */}
      </div>
    </div>
  );
}
