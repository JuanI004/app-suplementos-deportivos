# IronFuel 🏋️

E-commerce de suplementos deportivos construido como proyecto de portfolio. Permite explorar un catálogo de productos, gestionar un carrito de compras y realizar pedidos con autenticación de usuarios.

> **⚠️ Proyecto de portfolio** — Ningún producto será entregado.


![IronFuel Screenshot](public/images/ironfuel-header.webp)

---

## Tecnologías

| Tecnología                                     | Uso                                    |
| ---------------------------------------------- | -------------------------------------- |
| [Next.js 16](https://nextjs.org/)              | Framework principal (App Router)       |
| [React 19](https://react.dev/)                 | UI                                     |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Estado global del carrito              |
| [Supabase](https://supabase.com/)              | Base de datos, autenticación y storage |
| CSS Modules                                    | Estilos con scope por componente       |

---

## Funcionalidades

**Catálogo**

- Listado de productos con paginación (10 por página)
- Filtrado por categoría, subcategoría y marca
- Ordenamiento por precio (bajo a alto / alto a bajo)
- Búsqueda por nombre, descripción, categoría y marca
- Página de detalle con productos relacionados (misma marca + misma categoría)

**Carrito**

- Agregar, quitar y modificar cantidades
- Persistencia en `localStorage` — sobrevive recargas de página
- Panel lateral con animación de entrada

**Autenticación**

- Registro con confirmación por email (Supabase Auth)
- Login / logout
- Rutas protegidas (checkout, perfil)

**Checkout**

- Formulario de envío con validación
- Selección de método de pago (transferencia, efectivo, Mercado Pago)
- Guardado del pedido en Supabase

**Perfil**

- Historial de pedidos con estados (pendiente → confirmado → en camino → entregado)
- Filtrado por estado
- Vista expandible de detalle por pedido

---

## Estructura del proyecto

```
app/
├── page.js                  # Landing page
├── catalogo/
│   ├── page.js              # Listado de productos
│   ├── layout.js            # Sidebar con filtros
│   └── [slug]/page.js       # Detalle de producto
├── finalizar-compra/
│   └── page.js              # Checkout
├── perfil/
│   └── page.js              # Historial de pedidos
├── login/page.js
├── signup/page.js
└── verificacion/page.js     # Confirmación de email

components/
├── Header.jsx
├── Footer.jsx
├── Carro.jsx                # Panel del carrito
├── ProductoCard.jsx
├── AgregarCarro.jsx
├── Cantidad.jsx
├── PedidoEstadoBar.jsx      # Barra de progreso de estado
├── Categorias.jsx           # Sidebar de filtros
└── Input.jsx / InputCheckout.jsx

store/
├── index.js                 # Configuración de Redux
├── provider.js              # ReduxProvider + persistencia localStorage
└── slices/cart-slice.js

lib/
└── supabase.js              # Cliente de Supabase

utils/
└── data.js                  # Categorías, marcas y configuración de estados
```

---

## Base de datos (Supabase)

### Tabla `supplements`

Productos del catálogo con nombre, descripción, precio, categoría, marca, stock y datos de descuento.

### Tabla `pedidos`

```sql
id            UUID PRIMARY KEY
user_id       UUID REFERENCES auth.users
estado        TEXT  -- pendiente | confirmado | en_camino | entregado | cancelado
items         JSONB -- snapshot de productos al momento de la compra
total         NUMERIC
nombre        TEXT
apellido      TEXT
email         TEXT
telefono      TEXT
direccion     TEXT
ciudad        TEXT
departamento  TEXT
codigo_postal TEXT
metodo_pago   TEXT  -- transferencia | efectivo | mercadopago
notas         TEXT
created_at    TIMESTAMPTZ
updated_at    TIMESTAMPTZ
```

Los estados de los pedidos se actualizan manualmente desde el dashboard de Supabase.

---

## Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/ironfuel.git
cd ironfuel

# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev
```

---

## Decisiones de diseño

**Snapshot de productos en pedidos** — Los items del pedido se guardan como JSONB con el precio y nombre al momento de la compra. Esto garantiza que el historial sea inmutable aunque el producto cambie de precio en el futuro.

**Carrito en localStorage** — Permite persistencia sin necesidad de autenticación. El carrito se carga antes de renderizar gracias a un contexto `cargado` que evita redirecciones falsas cuando el array está temporalmente vacío.

**CSS Modules** — Cada componente tiene su propio archivo de estilos con scope automático, sin riesgo de colisiones de nombres.

---
