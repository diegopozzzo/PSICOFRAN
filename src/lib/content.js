import { Icon } from '../components/ui'

export const credenciales = [
  { num: 'UPCH', label: 'Egresada con mención en clínica' },
  { num: 'DBT', label: 'Formación en Centro CONTEXTO' },
  { num: '1+', label: 'Año de experiencia en infancia' },
  { num: '100%', label: 'Confidencialidad y contención' },
]

export const metodo = [
  {
    n: '01',
    icon: Icon.Heart,
    titulo: 'Escucha sin juicio',
    desc: 'Creamos un espacio seguro donde puedes expresarte con libertad. Todo lo que sientes tiene valor.',
  },
  {
    n: '02',
    icon: Icon.Sparkle,
    titulo: 'Comprensión profunda',
    desc: 'Identificamos juntas los patrones emocionales y relacionales detrás de los retos que enfrentas.',
  },
  {
    n: '03',
    icon: Icon.Leaf,
    titulo: 'Herramientas reales',
    desc: 'Estrategias concretas de DBT y crianza consciente que puedes aplicar hoy con tus hijos.',
  },
  {
    n: '04',
    icon: Icon.Users,
    titulo: 'Cambio sostenible',
    desc: 'No buscamos la perfección, sino cultivar un vínculo que crezca con el tiempo.',
  },
]

export const ayudas = [
  {
    icon: Icon.Leaf,
    titulo: 'Crianza respetuosa y consciente',
    desc: 'Acompañamiento para criar con presencia, sin gritos ni castigos que dañan el vínculo.',
    span: 'md:col-span-7',
  },
  {
    icon: Icon.Heart,
    titulo: 'Manejo de berrinches y conductas difíciles',
    desc: 'Entiende qué hay detrás de cada berrinche y cómo responder con calma.',
    span: 'md:col-span-5',
  },
  {
    icon: Icon.Sparkle,
    titulo: 'Límites y normas con conexión',
    desc: 'Firmeza y ternura pueden convivir: límites claros que cuidan la relación.',
    span: 'md:col-span-5',
  },
  {
    icon: Icon.Users,
    titulo: 'Gestión emocional para niños y familias',
    desc: 'Herramientas de regulación emocional para toda la familia, basadas en DBT.',
    span: 'md:col-span-7',
  },
  {
    icon: Icon.Clock,
    titulo: 'Hábitos y rutinas saludables',
    desc: 'Sueño, pantallas y rutinas realistas que se sostienen en el tiempo.',
    span: 'md:col-span-6',
  },
  {
    icon: Icon.Video,
    titulo: 'Orientación a madres, padres y cuidadores',
    desc: 'Sesiones online o presenciales para resolver tus dudas de crianza.',
    span: 'md:col-span-6',
  },
]

export const sobreMi = [
  'Psicóloga egresada de la UPCH, con mención en clínica',
  'Formación en Terapia Dialéctica Conductual (DBT) · Centro CONTEXTO',
  'Experiencia en evaluación e intervención con niños y adolescentes',
  'Ponente en "Maternidad y salud mental" · Mamá de una nena de 3 años',
]

export const exploreCards = [
  {
    to: '/servicios',
    icon: Icon.Heart,
    titulo: 'Servicios',
    desc: 'Consultas, orientación y acompañamiento familiar',
    gradient: 'from-blush-100 via-blush-50 to-cream',
  },
  {
    to: '/sobre-mi',
    icon: Icon.Sparkle,
    titulo: 'Sobre mí',
    desc: 'Mi historia, formación y enfoque clínico',
    gradient: 'from-sage-100 via-cream to-blush-50',
  },
  {
    to: '/metodo',
    icon: Icon.Leaf,
    titulo: 'Mi método',
    desc: 'Cómo acompaño el cambio, paso a paso',
    gradient: 'from-blush-200/40 via-cream to-sage-100',
  },
  {
    to: '/talleres',
    icon: Icon.Users,
    titulo: 'Talleres',
    desc: 'Próximas fechas e inscripciones abiertas',
    gradient: 'from-cream via-blush-100 to-blush-200/50',
  },
]
