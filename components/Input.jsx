import classes from "./Input.module.css";

export default function Input({ label, type, icon, placeholder }) {
  return (
    <div className={classes.group}>
      <label>{label}</label>
      <div className={classes.inputWrapper}>
        <input type={type} placeholder={placeholder} required />
        {icon && <div className={classes.icon}>{icon}</div>}
      </div>
    </div>
  );
}
