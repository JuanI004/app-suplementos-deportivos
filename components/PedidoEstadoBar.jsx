import classes from "./PedidoEstadoBar.module.css";
import { OVERVIEW_ITEMS } from "@/utils/data";

const STATUS_CLASS_MAP = {
  pendiente: classes.pendiente,
  confirmado: classes.confirmado,
  en_camino: classes.en_camino,
  entregado: classes.entregado,
  cancelado: classes.cancelado,
};

export default function PedidoEstadoBar({ estado }) {
  const steps = ["pendiente", "confirmado", "en_camino", "entregado"];
  const current = OVERVIEW_ITEMS[estado]?.step ?? 0;

  if (estado === "cancelado") {
    return (
      <div className={classes.cancelledStatus}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        Cancelado
      </div>
    );
  }
  return (
    <div className={classes.wrapper}>
      {steps.map((s, i) => {
        const done = i < current;
        const cfg = OVERVIEW_ITEMS[s];
        const stateClass = STATUS_CLASS_MAP[s] ?? "";
        return (
          <div
            key={s}
            className={`${classes.stepItem} ${i < steps.length - 1 ? classes.stepGrow : ""}`}
          >
            <div
              title={cfg.label}
              className={`${classes.stepDot} ${stateClass} ${done ? classes.stepDotDone : classes.stepDotPending}`}
            >
              {done ? (
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="#0a0a0a"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <div className={classes.stepDotInner} />
              )}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`${classes.stepLine} ${stateClass} ${done ? classes.stepLineDone : classes.stepLinePending}`}
              />
            )}
          </div>
        );
      })}
      <span
        className={`${classes.statusLabel} ${STATUS_CLASS_MAP[estado] ?? ""}`}
      >
        {OVERVIEW_ITEMS[estado]?.label}
      </span>
    </div>
  );
}
