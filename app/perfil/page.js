"use client";
import { useAuth } from "@/components/Auth";
import { useRouter } from "next/navigation";
import classes from "./page.module.css";

const OVERVIEW_ITEMS = [
  {
    title: "Pedidos",
    color: "#FFF",
  },
  {
    title: "Entregados",
    value: "entregado",
    color: "#96de37",
  },
  {
    title: "En Camino",
    value: "en_camino",
    color: "#895eb1",
  },
  {
    title: "Pendientes",
    value: "pendiente",
    color: "#f7a22c",
  },
  {
    title: "Confirmados",
    value: "confirmado",
    color: "#5bc0de",
  },
  { title: "Cancelados", value: "cancelado", color: "#d9534f" },
];

const MOCK_PEDIDOS = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    created_at: "2026-01-15T10:30:00Z",
    estado: "entregado",
    total: 154.97,
    metodo_pago: "transferencia",
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
    metodo_pago: "mercadopago",
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
    metodo_pago: "efectivo",
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
    metodo_pago: "transferencia",
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
  const router = useRouter();
  if (!session) {
    router.push("/login");
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
          {OVERVIEW_ITEMS.slice(0, 4).map((item) => (
            <div key={item.title} className={classes["overview-item"]}>
              <h1>
                {item.title === "Pedidos"
                  ? MOCK_PEDIDOS.length
                  : MOCK_PEDIDOS.filter(
                      (pedido) => pedido.estado === item.value,
                    ).length}
              </h1>
              <h3>{item.title}</h3>
            </div>
          ))}
        </section>
        <div className={classes["divider"]} />
        <section className={classes["perfil-pedidos"]}>
          <h3>Historial de Pedidos</h3>
          <ul className={classes["pedidos-categorias"]}>
            {OVERVIEW_ITEMS.map((item) => (
              <li key={item.title}>
                {" "}
                <h4>{item.title !== "Pedidos" ? item.title : "Todos"}</h4>
                {item.title !== "Pedidos" && (
                  <p>
                    {
                      MOCK_PEDIDOS.filter(
                        (pedido) => pedido.estado === item.value,
                      ).length
                    }
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
