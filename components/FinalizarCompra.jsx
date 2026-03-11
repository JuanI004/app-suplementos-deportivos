"use client";
import Link from "next/link";
import classes from "./FinalizarCompras.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cart-slice";
import { useState } from "react";
export default function FinalizarCompra({ precioTotal, handleToggle }) {
  const dispatch = useDispatch();
  const [errores, setErrores] = useState({});
  const [pedidoExitoso, setPedidoExitoso] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    departamento: "",
    metodoPago: "transferencia",
    notas: "",
  });
  function validarFormulario() {
    const errores = {};
    if (!formData.nombre.trim()) {
      errores.nombre = "El nombre es requerido";
    }
    if (!formData.apellido.trim()) {
      errores.apellido = "El apellido es requerido";
    }
    if (!formData.email.trim()) {
      errores.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errores.email = "Email inválido";
    }
    if (!formData.telefono.trim()) {
      errores.telefono = "El teléfono es requerido";
    }
    if (!formData.direccion.trim()) {
      errores.direccion = "La dirección es requerida";
    }
    if (!formData.ciudad.trim()) {
      errores.ciudad = "La ciudad es requerida";
    }
    if (!formData.codigoPostal.trim()) {
      errores.codigoPostal = "El código postal es requerido";
    }
    if (!formData.departamento.trim()) {
      errores.departamento = "El departamento es requerido";
    }
    setErrores(errores);
    return Object.keys(errores).length === 0;
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errores[name]) {
      setErrores((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }
    setPedidoExitoso(true);
    dispatch(cartActions.clearCart());
  }
  if (pedidoExitoso) {
    return (
      <div className={classes.finalizar}>
        <div className={classes["pedido-exitoso"]}>
          <h2>¡Pedido realizado con éxito!</h2>
          <p>Recibirás un email de confirmación a {formData.email}</p>
          <p>Total: ${precioTotal.toFixed(2)}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.finalizar}>
      <h2>Finalizar Compra</h2>
      <p className={classes.total}>Total a pagar: ${precioTotal.toFixed(2)}</p>
      <form onSubmit={handleSubmit} className={classes["finalizar-form"]}>
        <div className={classes["finalizar-section"]}>
          <h3>Información Personal</h3>
          <div>
            <div className={classes["finalizar-input"]}>
              <label htmlFor="nombre">Nombre *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
              {errores.nombre && (
                <span className={classes["finalizar-error"]}>
                  {errores.nombre}
                </span>
              )}
            </div>
            <div className={classes["finalizar-input"]}>
              <label htmlFor="apellido">Apellido *</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
              {errores.apellido && (
                <span className={classes["finalizar-error"]}>
                  {errores.apellido}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className={classes["finalizar-input"]}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errores.email && (
                <span className={classes["finalizar-error"]}>
                  {errores.email}
                </span>
              )}
            </div>
            <div className={classes["finalizar-input"]}>
              <label htmlFor="telefono">Teléfono *</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
              {errores.telefono && (
                <span className={classes["finalizar-error"]}>
                  {errores.telefono}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={classes["finalizar-section"]}>
          <h3>Dirección de Envío</h3>
          <div className={classes["finalizar-input"]}>
            <label htmlFor="direccion">Dirección *</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              placeholder="Calle y número"
              value={formData.direccion}
              onChange={handleChange}
            />
            {errores.direccion && (
              <span className={classes["finalizar-error"]}>
                {errores.direccion}
              </span>
            )}
          </div>
          <div>
            <div className={classes["finalizar-input"]}>
              <label htmlFor="ciudad">Ciudad *</label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
              />
              {errores.ciudad && (
                <span className={classes["finalizar-error"]}>
                  {errores.ciudad}
                </span>
              )}
            </div>
            <div className={classes["finalizar-input"]}>
              <label htmlFor="departamento">Departamento *</label>
              <input
                type="text"
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
              />
              {errores.departamento && (
                <span className={classes["finalizar-error"]}>
                  {errores.departamento}
                </span>
              )}
            </div>
            <div className={classes["finalizar-input"]}>
              <label htmlFor="codigoPostal">Código Postal *</label>
              <input
                type="text"
                id="codigoPostal"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={handleChange}
              />
              {errores.codigoPostal && (
                <span className={classes["finalizar-error"]}>
                  {errores.codigoPostal}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={classes["finalizar-section"]}>
          <h3>Método de Pago</h3>
          <div className={classes["finalizar-pago"]}>
            <label htmlFor="metodoPago">Selecciona un método *</label>
            <select
              id="metodoPago"
              name="metodoPago"
              value={formData.metodoPago}
              onChange={handleChange}
            >
              <option value="transferencia">Transferencia Bancaria</option>
              <option value="efectivo">Efectivo al recibir</option>
              <option value="mercadopago">Mercado Pago</option>
            </select>
          </div>
        </div>
        <div className={classes["finalizar-section"]}>
          <h3>Notas adicionales (opcional)</h3>
          <div className={classes["finalizar-notas"]}>
            <textarea
              id="notas"
              name="notas"
              placeholder="Instrucciones especiales de entrega, horarios preferidos, etc."
              value={formData.notas}
              onChange={handleChange}
              rows="4"
            />
          </div>
        </div>
        <button
          type="submit"
          className={
            Object.keys(errores).length > 0
              ? classes["desactivado"]
              : classes["finalizar-boton"]
          }
        >
          Confirmar Pedido
        </button>
      </form>
    </div>
  );
}
