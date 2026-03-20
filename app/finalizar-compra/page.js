"use client";
import Link from "next/link";
import classes from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/slices/cart-slice";
import placeholderImg from "@/public/images/placeholder.webp";
import { useState } from "react";
import Image from "next/image";
export default function FinalizarCompra() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const precioTotal = cartItems.reduce((total, item) => {
    let precio = item.precio;
    if (item.descuento) {
      precio = (item.precio * (100 - item.porcentajeDescuento)) / 100;
    }
    return total + precio * item.quantity;
  }, 0);
  //   useEffect(() => {
  //     if (!session) {
  //       router.push("/login");
  //     }
  //   }, [session]);
  //   useEffect(() => {
  //     if (cartItems.length === 0) {
  //       router.push("/catalogo");
  //     }
  //   }, [cartItems]);

  //   if (!session) return null;
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
      <section>
        <h2>Finalizar Compra</h2>
        <form onSubmit={handleSubmit} className={classes["finalizar-form"]}>
          <div className={classes["finalizar-info"]}>
            <h3 className={classes["finalizar-section__title"]}>
              Información Personal
            </h3>
            <div className={classes["finalizar-input"]}>
              <label htmlFor="nombre">Nombre *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Juan"
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
                placeholder="Pérez"
                value={formData.apellido}
                onChange={handleChange}
              />
              {errores.apellido && (
                <span className={classes["finalizar-error"]}>
                  {errores.apellido}
                </span>
              )}
            </div>

            <div className={classes["finalizar-input"]}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tu@email.com"
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
                placeholder="099 123 456"
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

          <div className={classes["finalizar-direccion"]}>
            <h3 className={classes["finalizar-section__title"]}>
              Dirección de Envío
            </h3>
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
            <div className={classes["finalizar-ubicacion"]}>
              <div className={classes["finalizar-input"]}>
                <label htmlFor="ciudad">Ciudad *</label>
                <input
                  type="text"
                  id="ciudad"
                  name="ciudad"
                  placeholder="Montevideo"
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
                  placeholder="Montevideo"
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
                  placeholder="12300"
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
          <div className={classes["finalizar-metodo"]}>
            <h3 className={classes["finalizar-section__title"]}>
              Método de Pago
            </h3>
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
          <div className={classes["finalizar-nota"]}>
            <h3 className={classes["finalizar-section__title"]}>
              Notas adicionales (opcional)
            </h3>
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
      </section>
      <section className={classes["pedido-resumen"]}>
        <div
          className={classes["pedido-resumen__caracteristica"]}
          style={{
            borderBottom: "1px solid #444",
            marginBottom: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <h3>Resumen del Pedido</h3>
          <p>
            {totalQuantity} {totalQuantity === 1 ? "producto" : "productos"}
          </p>
        </div>
        <ul style={{ borderBottom: "1px solid #444", marginBottom: "1rem" }}>
          {cartItems.map((item, index) => (
            <li key={item.id} className={classes["cart-item"]}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <Image src={placeholderImg} alt="imagen" height={60} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p>{item.nombre}</p>
                  <h2>
                    $
                    {(item.descuento
                      ? (item.precio * (100 - item.porcentajeDescuento)) / 100
                      : item.precio
                    ).toFixed(2)}
                  </h2>
                </div>
              </div>

              <div>
                <h2
                  style={{
                    color: "#ffffff",
                    fontSize: "1rem",
                    fontWeight: "700",
                  }}
                >
                  $
                  {(
                    item.quantity *
                    (item.descuento
                      ? (item.precio * (100 - item.porcentajeDescuento)) / 100
                      : item.precio)
                  ).toFixed(2)}
                </h2>
              </div>
            </li>
          ))}
        </ul>
        <div className={classes["pedido-resumen__caracteristica"]}>
          <h2>Subtotal:</h2>
          <p style={{ color: "grey", fontWeight: "normal" }}>
            ${precioTotal.toFixed(2)}
          </p>
        </div>
        <div className={classes["pedido-resumen__caracteristica"]}>
          <h2>Envio:</h2>
          <h3
            style={{
              marginRight: "0.5rem",
              textTransform: "capitalize",
              color: "#96de37",
            }}
          >
            Gratis
          </h3>
        </div>
        <div className={classes["pedido-total"]}>
          <h2>Total:</h2>
          <p>${precioTotal.toFixed(2)}</p>
        </div>
      </section>
    </div>
  );
}
