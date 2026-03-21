export const CATEGORIAS = [
  {
    id: 1,
    nombre: "Suplementos",
    descripcion:
      "Suplementos deportivos para mejorar tu rendimiento y recuperación",
  },
  {
    id: 2,
    nombre: "Vitaminas",
    descripcion: "Vitaminas y minerales esenciales para tu salud",
  },
  {
    id: 3,
    nombre: "Accesorios",
    descripcion: "Accesorios para entrenamiento y organización",
  },
];

export const SUBCATEGORIAS = [
  // Suplementos
  { id: 1, nombre: "Proteínas", categoriaId: 1 },
  { id: 2, nombre: "Creatinas", categoriaId: 1 },
  { id: 3, nombre: "Ganadores de Masa", categoriaId: 1 },
  { id: 4, nombre: "Pre-Workout", categoriaId: 1 },
  { id: 5, nombre: "Aminoácidos", categoriaId: 1 },
  { id: 6, nombre: "Quemadores", categoriaId: 1 },
  { id: 7, nombre: "Hidratación", categoriaId: 1 },
  { id: 8, nombre: "Energía", categoriaId: 1 },
  // Vitaminas
  { id: 9, nombre: "Multivitamínicos", categoriaId: 2 },
  { id: 10, nombre: "Aceites Esenciales", categoriaId: 2 },
  { id: 11, nombre: "Vitaminas Individuales", categoriaId: 2 },
  { id: 12, nombre: "Minerales", categoriaId: 2 },
  { id: 13, nombre: "Adaptógenos", categoriaId: 2 },
  { id: 14, nombre: "Descanso", categoriaId: 2 },
  { id: 15, nombre: "Salud Articular", categoriaId: 2 },
  // Accesorios
  { id: 16, nombre: "Shakers", categoriaId: 3 },
  { id: 17, nombre: "Botellas", categoriaId: 3 },
  { id: 18, nombre: "Entrenamiento", categoriaId: 3 },
  { id: 19, nombre: "Cardio", categoriaId: 3 },
  { id: 20, nombre: "Higiene", categoriaId: 3 },
  { id: 21, nombre: "Bolsos", categoriaId: 3 },
  { id: 22, nombre: "Organización", categoriaId: 3 },
  { id: 23, nombre: "Recuperación", categoriaId: 3 },
];

export const MARCAS = [
  {
    id: 1,
    nombre: "IronPeak",
    descripcion: "Líder mundial en nutrición deportiva desde 1986",
    logo: "/images/marcas/ironpeak-logo.png",
  },
  {
    id: 2,
    nombre: "NexaFit",
    descripcion: "Innovación y calidad en suplementos deportivos",
    logo: "/images/marcas/nexafit-logo.png",
  },
  {
    id: 3,
    nombre: "ForgeX",
    descripcion: "Fórmulas científicamente probadas para atletas",
    logo: "/images/marcas/forgex-logo.png",
  },
  {
    id: 4,
    nombre: "PureRoot",
    descripcion: "Suplementos orgánicos y veganos certificados",
    logo: "/images/marcas/pureroot-logo.png",
  },
  {
    id: 5,
    nombre: "ApexCore",
    descripcion: "Performance y sabor excepcional desde 2001",
    logo: "/images/marcas/apexcore-logo.png",
  },
  {
    id: 6,
    nombre: "VoltLab",
    descripcion: "Innovación en nutrición deportiva y pre-workouts",
    logo: "/images/marcas/voltlab-logo.png",
  },
];

export const OVERVIEW_ITEMS = {
  pedidos: { label: "Pedidos", color: "#FFF" },
  pendiente: {
    label: "Pendiente",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.25)",
    step: 1,
  },
  confirmado: {
    label: "Confirmado",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.25)",
    step: 2,
  },
  en_camino: {
    label: "En camino",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.25)",
    step: 3,
  },
  entregado: {
    label: "Entregado",
    color: "#96de37",
    bg: "rgba(150,222,55,0.08)",
    border: "rgba(150,222,55,0.25)",
    step: 4,
  },
  cancelado: {
    label: "Cancelado",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.25)",
    step: 0,
  },
};

const SUPABASE_STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images`;

export const PRODUCT_IMAGES = {
  // Suplementos
  imgSuplementoIronPeak: `${SUPABASE_STORAGE_URL}/imgSuplementoIronPeak.webp`,
  imgSuplementoNexaFit: `${SUPABASE_STORAGE_URL}/imgSuplementoNexaFit.webp`,
  imgSuplementoForgeX: `${SUPABASE_STORAGE_URL}/imgSuplementoForgeX.webp`,
  imgSuplementoPureRoot: `${SUPABASE_STORAGE_URL}/imgSuplementoPureRoot.webp`,
  imgSuplementoApexCore: `${SUPABASE_STORAGE_URL}/imgSuplementoApexCore.webp`,
  imgSuplementoVoltLab: `${SUPABASE_STORAGE_URL}/imgSuplementoVoltLab.webp`,
  // Vitaminas
  imgVitaminaIronPeak: `${SUPABASE_STORAGE_URL}/imgVitaminaIronPeak.webp`,
  imgVitaminaNexaFit: `${SUPABASE_STORAGE_URL}/imgVitaminaNexaFit.webp`,
  imgVitaminaForgeX: `${SUPABASE_STORAGE_URL}/imgVitaminaForgeX.webp`,
  imgVitaminaPureRoot: `${SUPABASE_STORAGE_URL}/imgVitaminaPureRoot.webp`,
  imgVitaminaApexCore: `${SUPABASE_STORAGE_URL}/imgVitaminaApexCore.webp`,
  imgVitaminaVoltLab: `${SUPABASE_STORAGE_URL}/imgVitaminaVoltLab.webp`,
  // Accesorios
  imgBalanza: `${SUPABASE_STORAGE_URL}/imgBalanza.webp`,
  imgBandas4: `${SUPABASE_STORAGE_URL}/imgBandas4.webp`,
  imgBandas5: `${SUPABASE_STORAGE_URL}/imgBandas5.webp`,
  imgBolasMasajes: `${SUPABASE_STORAGE_URL}/imgBolasMasajes.webp`,
  imgBotella: `${SUPABASE_STORAGE_URL}/imgBotella.webp`,
  imgChalk: `${SUPABASE_STORAGE_URL}/imgChalk.webp`,
  imgCinturon: `${SUPABASE_STORAGE_URL}/imgCinturon.webp`,
  imgGuantes: `${SUPABASE_STORAGE_URL}/imgGuantes.webp`,
  imgShaker: `${SUPABASE_STORAGE_URL}/imgShaker.webp`,
  imgCuerda: `${SUPABASE_STORAGE_URL}/imgCuerda.webp`,
  imgFoamRoller: `${SUPABASE_STORAGE_URL}/imgFoamRoller.webp`,
  imgMochila: `${SUPABASE_STORAGE_URL}/imgMochila.webp`,
  imgMuniequeras: `${SUPABASE_STORAGE_URL}/imgMuniequeras.webp`,
  imgPastillero: `${SUPABASE_STORAGE_URL}/imgPastillero.webp`,
  imgRodilleras: `${SUPABASE_STORAGE_URL}/imgRodilleras.webp`,
  imgStraps: `${SUPABASE_STORAGE_URL}/imgStraps.webp`,
  imgToalla: `${SUPABASE_STORAGE_URL}/imgToalla.webp`,
};
