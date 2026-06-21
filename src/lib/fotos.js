/** Rutas de fotos en /public/fotos (6 seleccionadas de la sesión) */
const base = import.meta.env.BASE_URL

export const fotos = {
  hero: `${base}fotos/hero.jpg`,
  retrato: `${base}fotos/retrato.jpg`,
  escritorio: `${base}fotos/escritorio.jpg`,
  tablet: `${base}fotos/tablet.jpg`,
  sentada: `${base}fotos/sentada.jpg`,
  perfil: `${base}fotos/perfil.jpg`,
}
