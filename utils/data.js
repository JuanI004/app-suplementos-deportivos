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
    nombre: "Optimum Nutrition",
    descripcion: "Líder mundial en nutrición deportiva desde 1986",
    logo: "/images/marcas/optimum-nutrition-logo.png",
  },
  {
    id: 2,
    nombre: "Dymatize",
    descripcion: "Innovación y calidad en suplementos deportivos",
    logo: "/images/marcas/dymatize-logo.png",
  },
  {
    id: 3,
    nombre: "MuscleTech",
    descripcion: "Fórmulas científicamente probadas para atletas",
    logo: "/images/marcas/muscletech-logo.png",
  },
  {
    id: 4,
    nombre: "Garden of Life",
    descripcion: "Suplementos orgánicos y veganos certificados",
    logo: "/images/marcas/garden-of-life-logo.png",
  },
  {
    id: 5,
    nombre: "BSN",
    descripcion: "Performance y sabor excepcional desde 2001",
    logo: "/images/marcas/bsn-logo.png",
  },
  {
    id: 6,
    nombre: "Cellucor",
    descripcion: "Innovación en nutrición deportiva y pre-workouts",
    logo: "/images/marcas/cellucor-logo.png",
  },
];
const SUPABASE_STORAGE_URL = `https://${process.env.NEXT_PUBLIC_SUPABASE_URL}.supabase.co/storage/v1/object/public/product-images`;
export const PRODUCT_IMAGES = {
  imgSuplementoOptimumNutrition: `${SUPABASE_STORAGE_URL}/imgSuplementoOptimumNutrition.jpg`,
  imgSuplementoDymatize: `${SUPABASE_STORAGE_URL}/imgSuplementoDymatize.jpg`,
  imgSuplementoMuscleTech: `${SUPABASE_STORAGE_URL}/imgSuplementoMuscleTech.jpg`,
  imgSuplementoGardenOfLife: `${SUPABASE_STORAGE_URL}/imgSuplementoGardenOfLife.jpg`,
  imgSuplementoBSN: `${SUPABASE_STORAGE_URL}/imgSuplementoBSN.jpg`,
  imgSuplementoCellucor: `${SUPABASE_STORAGE_URL}/imgSuplementoCellucor.jpg`,
  // Vitaminas
  imgVitaminaOptimumNutrition: `${SUPABASE_STORAGE_URL}/imgVitaminaOptimumNutrition.jpg`,
  imgVitaminaDymatize: `${SUPABASE_STORAGE_URL}/imgVitaminaDymatize.jpg`,
  imgVitaminaMuscleTech: `${SUPABASE_STORAGE_URL}/imgVitaminaMuscleTech.jpg`,
  imgVitaminaGardenOfLife: `${SUPABASE_STORAGE_URL}/imgVitaminaGardenOfLife.jpg`,
  imgVitaminaBSN: `${SUPABASE_STORAGE_URL}/imgVitaminaBSN.jpg`,
  imgVitaminaCellucor: `${SUPABASE_STORAGE_URL}/imgVitaminaCellucor.jpg`,
  // Accesorios
  imgAccesorioOptimumNutrition: `${SUPABASE_STORAGE_URL}/imgAccesorioOptimumNutrition.jpg`,
  imgAccesorioDymatize: `${SUPABASE_STORAGE_URL}/imgAccesorioDymatize.jpg`,
  imgAccesorioMuscleTech: `${SUPABASE_STORAGE_URL}/imgAccesorioMuscleTech.jpg`,
  imgAccesorioGardenOfLife: `${SUPABASE_STORAGE_URL}/imgAccesorioGardenOfLife.jpg`,
  imgAccesorioBSN: `${SUPABASE_STORAGE_URL}/imgAccesorioBSN.jpg`,
  imgAccesorioCellucor: `${SUPABASE_STORAGE_URL}/imgAccesorioCellucor.jpg`,
};
