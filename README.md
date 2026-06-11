# Francis Landeo · Web

Sitio web para Francis Landeo, psicóloga clínica especializada en crianza consciente.

## Funcionalidades

- **Landing**: presentación, "quién soy", servicios y manifiesto, basados en su identidad de marca (rosa y beige, orgánico y moderno).
- **Reserva de citas** (`/#/reservar`): el paciente elige tipo de sesión → fecha en calendario (respeta los días y horarios de atención configurados) → hora libre → deja sus datos. Confirmación con enlace directo a WhatsApp.
- **Talleres y webinars** (`/#/talleres`): listado público con filtros, cupos en tiempo real e inscripción.
- **Panel de administración** (`/#/admin`, también desde "Acceso profesional" en el pie de página):
  - Citas: confirmar, cancelar, eliminar y contactar por WhatsApp.
  - Talleres y webinars: crear, editar, despublicar (borrador) y eliminar.
  - Inscripciones: lista de inscritos por evento.
  - Disponibilidad: días de atención, horarios, datos de contacto y PIN.

**PIN inicial: `1234`** (se puede cambiar en Disponibilidad).

## Datos

Los datos se guardan en `localStorage` del navegador (clave `landeo_db_v1`). No requiere servidor: ideal para demo y validación. Para producción multi-dispositivo, conectar la capa `src/lib/store.js` a un backend (Supabase, Firebase, etc.).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
```

Stack: Vite · React · Tailwind CSS v4 · React Router (HashRouter, compatible con hosting estático).
