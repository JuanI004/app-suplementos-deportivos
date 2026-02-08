"use client";
import Link from "next/link";
import classes from "./FinalizarCompras.module.css";
import { useState } from "react";
export default function FinalizarCompra({ precioTotal }) {
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
    if (pedidoExitoso) {
      return (
        <div>
          <h2>¡Pedido realizado con éxito!</h2>
          <p>Recibirás un email de confirmación a {formData.email}</p>
          <p>Total: ${precioTotal.toFixed(2)}</p>
          <button>
            <Link href="/">Volver al inicio</Link>
          </button>
        </div>
      );
    }
  }
  return (
    <div className={classes.finalizar}>
      <h2>Finalizar Compra</h2>
      <p>Total a pagar: ${precioTotal.toFixed(2)}</p>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div>
          <h3>Información Personal</h3>
          <div>
            <div>
              <label htmlFor="nombre">Nombre *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
              {errores.nombre && <span>{errores.nombre}</span>}
            </div>
            <div>
              <label htmlFor="apellido">Apellido *</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
              {errores.apellido && <span>{errores.apellido}</span>}
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errores.email && <span>{errores.email}</span>}
            </div>
            <div>
              <label htmlFor="telefono">Teléfono *</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
              {errores.telefono && <span>{errores.telefono}</span>}
            </div>
          </div>
        </div>
        <div>
          <h3>Dirección de Envío</h3>
          <div>
            <label htmlFor="direccion">Dirección *</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              placeholder="Calle y número"
              value={formData.direccion}
              onChange={handleChange}
            />
            {errores.direccion && <span>{errores.direccion}</span>}
          </div>
          <div>
            <div>
              <label htmlFor="ciudad">Ciudad *</label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
              />
              {errores.ciudad && <span>{errores.ciudad}</span>}
            </div>
            <div>
              <label htmlFor="departamento">Departamento *</label>
              <input
                type="text"
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
              />
              {errores.departamento && <span>{errores.departamento}</span>}
            </div>
            <div>
              <label htmlFor="codigoPostal">Código Postal *</label>
              <input
                type="text"
                id="codigoPostal"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={handleChange}
              />
              {errores.codigoPostal && <span>{errores.codigoPostal}</span>}
            </div>
          </div>
        </div>
        <div>
          <h3>Método de Pago</h3>
          <div>
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
        <div>
          <h3>Notas adicionales (opcional)</h3>
          <div>
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
        <button type="submit">Confirmar Pedido</button>
      </form>
    </div>
  );
}
