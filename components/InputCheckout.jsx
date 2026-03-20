import classes from "./InputCheckout.module.css";

export default function InputCheckout({
  label,
  type,
  name,
  value,
  placeholder,
  errores,
  onChange,
}) {
  return (
    <div className={classes["finalizar-input"]}>
      <label htmlFor="direccion">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errores && <span className={classes["finalizar-error"]}>{errores}</span>}
    </div>
  );
}
