"use client";
import { useAuth } from "@/components/Auth";
import { useRouter } from "next/navigation";
import classes from "./page.module.css";
import placeholder from "@/public/images/placeholder.webp";
import PedidoEstadoBar from "@/components/PedidoEstadoBar";
import { OVERVIEW_ITEMS } from "@/utils/data";
import { useState } from "react";
import Image from "next/image";

const MOCK_PEDIDOS = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    created_at: "2026-01-15T10:30:00Z",
    estado: "entregado",
    total: 154.97,
    metodo_pago: "Transferencia bancaria",
    notas: "Dejar en portería",
    nombre: "Juan",
    apellido: "García",
    direccion: "Av. Italia 1234",
    ciudad: "Montevideo",
    departamento: "Montevideo",
    codigo_postal: "11300",
    items: [
      {
        id: 1,
        nombre: "Whey Protein Isolate Chocolate",
        cantidad: 2,
        precio: 89.99,
        descuento: true,
        porcentajeDescuento: 15,
      },
      {
        id: 6,
        nombre: "Creatina Monohidrato Micronizada",
        cantidad: 1,
        precio: 39.99,
        descuento: true,
        porcentajeDescuento: 25,
      },
    ],
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    created_at: "2026-02-03T14:20:00Z",
    estado: "en_camino",
    total: 94.99,
    metodo_pago: "Mercado Pago",
    notas: "",
    nombre: "Juan",
    apellido: "García",
    direccion: "Av. Italia 1234",
    ciudad: "Montevideo",
    departamento: "Montevideo",
    codigo_postal: "11300",
    items: [
      {
        id: 5,
        nombre: "Caseína Micelar Nocturna",
        cantidad: 1,
        precio: 94.99,
        descuento: false,
        porcentajeDescuento: 0,
      },
    ],
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    created_at: "2026-03-01T09:00:00Z",
    estado: "pendiente",
    total: 44.99,
    metodo_pago: "Efectivo",
    notas: "",
    nombre: "Juan",
    apellido: "García",
    direccion: "Av. Italia 1234",
    ciudad: "Montevideo",
    departamento: "Montevideo",
    codigo_postal: "11300",
    items: [
      {
        id: 12,
        nombre: "BCAAs 2:1:1 Limón",
        cantidad: 1,
        precio: 44.99,
        descuento: false,
        porcentajeDescuento: 0,
      },
    ],
  },
  {
    id: "d4e5f6a7-b8c9-0123-defa-234567890123",
    created_at: "2025-12-20T16:45:00Z",
    estado: "cancelado",
    total: 119.99,
    metodo_pago: "Transferencia bancaria",
    notas: "",
    nombre: "Juan",
    apellido: "García",
    direccion: "Av. Italia 1234",
    ciudad: "Montevideo",
    departamento: "Montevideo",
    codigo_postal: "11300",
    items: [
      {
        id: 8,
        nombre: "Ganador de Masa Extreme 5000",
        cantidad: 1,
        precio: 119.99,
        descuento: true,
        porcentajeDescuento: 15,
      },
    ],
  },
];

export default function Perfil() {
  const { session, setSession } = useAuth();
  const [pedidoAbierto, setPedidoAbierto] = useState(null);
  const router = useRouter();
  if (!session) {
    router.push("/login");
  }
  function sumaTotal(items) {
    return items.reduce((total, item) => {
      const precioFinal = item.descuento
        ? item.precio * (1 - item.porcentajeDescuento / 100)
        : item.precio;
      return total + precioFinal * item.cantidad;
    }, 0);
  }
  function cantTotal(items) {
    return items.reduce((total, item) => total + item.cantidad, 0);
  }
  return (
    <div className={classes.bg}>
      <main className={classes.perfil}>
        <section className={classes["perfil-section"]}>
          <header className={classes["perfil-header"]}>
            <h2>Mi cuenta</h2>
            <h1>{session.user?.user_metadata?.nombre ?? "Perfil"}</h1>
            <p>{session.user?.email}</p>
          </header>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"></path>
            </svg>
            Cerrar sesión
          </button>
        </section>
        <section className={classes["perfil-overview"]}>
          {Object.entries(OVERVIEW_ITEMS)
            .slice(0, 4)
            .map(([key, item]) => (
              <div key={key} className={classes["overview-item"]}>
                <h1>
                  {item.label === "Pedidos"
                    ? MOCK_PEDIDOS.length
                    : MOCK_PEDIDOS.filter((pedido) => pedido.estado === key)
                        .length}
                </h1>
                <h3>{item.label}</h3>
              </div>
            ))}
        </section>
        <div className={classes["divider"]} />
        <section className={classes["perfil-pedidos"]}>
          <h3>Historial de Pedidos</h3>
          <ul className={classes["pedidos-categorias"]}>
            {Object.entries(OVERVIEW_ITEMS).map(([key, item]) => (
              <li key={key}>
                {" "}
                <h4>{item.label !== "Pedidos" ? item.label : "Todos"}</h4>
                {item.label !== "Pedidos" && (
                  <p>
                    {
                      MOCK_PEDIDOS.filter((pedido) => pedido.estado === key)
                        .length
                    }
                  </p>
                )}
              </li>
            ))}
          </ul>
          <ul className={classes["pedidos-lista"]}>
            {MOCK_PEDIDOS.map((pedido) => (
              <li key={pedido.id}>
                <div
                  key={pedido.id}
                  onClick={() =>
                    setPedidoAbierto((prev) =>
                      prev === pedido.id ? null : pedido.id,
                    )
                  }
                  className={classes["pedido-item"]}
                  style={
                    pedidoAbierto !== pedido.id
                      ? {
                          borderBottomLeftRadius: "10px",
                          borderBottomRightRadius: "10px",
                        }
                      : {}
                  }
                >
                  <div className={classes["pedido-info"]}>
                    <h2>Pedido</h2>
                    <h1>#{pedido.id.substring(0, 8)}</h1>
                    <p>{new Date(pedido.created_at).toLocaleDateString()}</p>
                  </div>
                  <PedidoEstadoBar estado={pedido.estado} />
                  <div className={classes["pedido-resumen"]}>
                    <div className={classes["pedido-total"]}>
                      <h3>${sumaTotal(pedido.items).toFixed(2)}</h3>
                      <p>{cantTotal(pedido.items)} items</p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#6e6e6e"
                      viewBox="0 0 256 256"
                      className={
                        pedidoAbierto === pedido.id ? classes["up"] : ""
                      }
                    >
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                </div>
                {pedidoAbierto === pedido.id && (
                  <section className={classes["pedido-detalles"]}>
                    <h3>Productos</h3>
                    <ul className={classes["pedido-productos"]}>
                      {pedido.items.map((item) => (
                        <li key={item.id}>
                          <div className={classes["pedido-producto-info"]}>
                            <Image
                              src={placeholder}
                              alt={item.nombre}
                              width={50}
                              height={50}
                            />
                            <div>
                              <h3>{item.nombre}</h3>
                              <p>x{item.cantidad}</p>
                            </div>
                          </div>
                          <div className={classes["pedido-producto-precio"]}>
                            {item.descuento ? (
                              <>
                                <span className={classes["precio-descuento"]}>
                                  ${(item.precio * item.cantidad).toFixed(2)}
                                </span>
                                <span className={classes["precio"]}>
                                  ${sumaTotal([item]).toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className={classes["precio"]}>
                                ${item.precio.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className={classes["pedido-info-detalles"]}>
                      <div>
                        <h3>Envío</h3>
                        <p>
                          {pedido.nombre} {pedido.apellido}
                        </p>
                        <p>{pedido.direccion}</p>
                        <p>
                          {pedido.departamento} {pedido.codigo_postal}
                        </p>
                      </div>
                      <div>
                        <h3>Pago</h3>
                        <p>{pedido.metodo_pago}</p>
                        <p style={{ fontStyle: "italic" }}>
                          &quot;{pedido.notas}&quot;
                        </p>
                      </div>
                    </div>
                  </section>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
