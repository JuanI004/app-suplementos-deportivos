"use client";
import classes from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/slices/cart-slice";
import placeholderImg from "@/public/images/placeholder.webp";
import { useEffect, useState } from "react";
import Image from "next/image";
import InputCheckout from "@/components/InputCheckout";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCargado } from "@/store/provider";
export default function FinalizarCompra() {
  const cargado = useCargado();
  const [session, setSession] = useState(null);
  const [errores, setErrores] = useState({});
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
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems.length);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const precioTotal = cartItems.reduce((total, item) => {
    let precio = item.precio;
    if (item.descuento) {
      precio = (item.precio * (100 - item.porcentajeDescuento)) / 100;
    }
    return total + precio * item.quantity;
  }, 0);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push("/login");
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.push("/login");
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (!cargado) return;
    if (cartItems.length === 0) {
      router.push("/catalogo");
    }
  }, [cartItems, cargado]);

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
    const items = cartItems.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      cantidad: item.quantity,
      precio: item.precio,
      descuento: item.descuento ?? false,
      porcentajeDescuento: item.porcentajeDescuento ?? 0,
    }));

    const { error } = await supabase.from("pedidos").insert({
      user_id: session.user.id,
      estado: "pendiente",
      items,
      total: precioTotal,
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      telefono: formData.telefono,
      direccion: formData.direccion,
      ciudad: formData.ciudad,
      departamento: formData.departamento,
      codigo_postal: formData.codigoPostal,
      metodo_pago: formData.metodoPago,
      notas: formData.notas || null,
    });
    if (error) {
      setErrores({
        general: "No se pudo guardar el pedido. Intentá de nuevo.",
      });
      return;
    }
    dispatch(cartActions.clearCart());
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
            <InputCheckout
              label="Nombre *"
              type="text"
              name="nombre"
              value={formData.nombre}
              placeholder="Juan"
              onChange={handleChange}
              errores={errores}
            />
            <InputCheckout
              label="Apellido *"
              type="text"
              name="apellido"
              value={formData.apellido}
              placeholder="Pérez"
              onChange={handleChange}
              errores={errores}
            />
            <InputCheckout
              label="Teléfono *"
              type="text"
              name="telefono"
              value={formData.telefono}
              placeholder="099 123 456"
              onChange={handleChange}
              errores={errores}
            />
            <InputCheckout
              label="Email *"
              type="email"
              name="email"
              value={formData.email}
              placeholder="tu@email.com"
              onChange={handleChange}
              errores={errores}
            />
          </div>
          <div className={classes["finalizar-direccion"]}>
            <h3 className={classes["finalizar-section__title"]}>
              Dirección de Envío
            </h3>
            <InputCheckout
              label="Dirección *"
              type="text"
              name="direccion"
              value={formData.direccion}
              placeholder="Calle y número"
              onChange={handleChange}
              errores={errores}
            />
            <div className={classes["finalizar-ubicacion"]}>
              <InputCheckout
                label="Ciudad *"
                type="text"
                name="ciudad"
                value={formData.ciudad}
                placeholder="Montevideo"
                onChange={handleChange}
                errores={errores}
              />
              <InputCheckout
                label="Departamento *"
                type="text"
                name="departamento"
                value={formData.departamento}
                placeholder="Montevideo"
                onChange={handleChange}
                errores={errores}
              />
              <InputCheckout
                label="Código Postal *"
                type="text"
                name="codigoPostal"
                value={formData.codigoPostal}
                placeholder="12300"
                onChange={handleChange}
                errores={errores}
              />
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
          <p
            style={{
              color: "#f87171",
              fontSize: "0.8rem",
              textAlign: "center",
            }}
          >
            {errores.general}
          </p>
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
        <p className={classes["pedido-resumen__aviso"]}>
          {" "}
          Este es un proyecto de portfolio. Ningún producto será entregado.
        </p>
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  position: "relative",
                }}
              >
                <p className={classes["cart-item__quantity"]}>
                  {item.quantity}
                </p>
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
