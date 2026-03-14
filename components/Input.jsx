import classes from "./Input.module.css";

export default function Input({
  label,
  type,
  icon,
  placeholder,
  value,
  onChange,
  error,
  verIcon,
  togglePassword,
}) {
  return (
    <div className={classes.group}>
      <label>{label}</label>
      <div className={classes.inputWrapper}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {icon && <div className={classes.icon}>{icon}</div>}
        {verIcon && (
          <div className={classes["icon-ver"]} onClick={togglePassword}>
            {verIcon}
          </div>
        )}
      </div>
      {error && <div className={classes.error}>{error}</div>}
    </div>
  );
}
