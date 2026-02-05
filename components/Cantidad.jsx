import classes from "./Cantidad.module.css";
export default function Cantidad({ cantidad, handleDecCarro, handleIncCarro }) {
  return (
    <div className={classes["cant"]}>
      <button onClick={handleDecCarro} className={classes["dec"]}>
        -
      </button>
      <p>{cantidad}</p>
      <button onClick={handleIncCarro} className={classes["inc"]}>
        +
      </button>
    </div>
  );
}
