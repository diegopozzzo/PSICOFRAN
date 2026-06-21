/** Rutas de fotos en /public/fotos — prefijo absoluto para producción */
const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`

function foto(path) {
  return `${base}${path}`
}

export const fotos = {
  hero: foto('fotos/hero.jpg'),
  retrato: foto('fotos/retrato.jpg'),
  escritorio: foto('fotos/escritorio.jpg'),
  tablet: foto('fotos/tablet.jpg'),
  sentada: foto('fotos/sentada.jpg'),
  perfil: foto('fotos/perfil.jpg'),
}
