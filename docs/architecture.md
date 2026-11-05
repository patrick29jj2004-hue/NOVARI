# Arquitectura

## Aplicación

FANAMI usa Next.js App Router con TypeScript estricto. La mayor parte de las rutas y páginas se renderiza en servidor. Los componentes cliente se limitan a navegación móvil, formularios interactivos, selectores de demos y carrito local.

Las rutas en español no tienen prefijo; las rutas inglesas viven bajo `/en/[[...segments]]`. El selector de idioma conserva el pathname. El catálogo, servicios y demos comparten contenido y estructura localizados para reducir duplicación. `src/lib/content.ts` centraliza los servicios, paquetes y proyectos conceptuales.

## Captación y datos

`POST /api/contact` valida nuevamente el cuerpo con Zod, aplica honeypot y un límite básico en memoria, y envía el mensaje al proveedor Resend solo cuando `RESEND_API_KEY`, `CONTACT_EMAIL` y `RESEND_FROM_EMAIL` existen. No se almacenan consultas en una base de datos y los errores de configuración o rechazo del proveedor se comunican explícitamente.

El límite en memoria puede reiniciarse al reciclar la instancia y no coordina varias instancias. Debe reemplazarse o complementarse con almacenamiento compartido antes de depender de él como protección de producción.

El carrito de AUREN se guarda localmente, se revalida contra el catálogo estático y nunca llama a un procesador de pagos. Sus productos y precios son ejemplos conceptuales.

## Catálogo

`/catalog` y `/en/catalog` son HTML imprimible, con diez hojas y reglas `@media print` para A4. `scripts/generate-catalog.mjs` inicia un servidor local temporal, usa Playwright Chromium para imprimir ambos idiomas y `pdf-lib` para comprobar que cada salida tenga diez páginas. Los archivos se guardan bajo `public/catalog/`; no se publica un enlace de descarga hasta que el archivo correspondiente existe.

## SEO, accesibilidad y seguridad

Las rutas declaran metadata, canonical y sitemap. `/robots.txt` limita la exploración del API. El sitio incluye labels, navegación por teclado, enlace para saltar al contenido, estado de menú móvil, avisos con `aria-live` y respeto por `prefers-reduced-motion`. Los encabezados de seguridad se configuran en `next.config.ts`; HSTS se activa en producción.

No hay analítica, pagos, perfiles sociales inventados ni imágenes remotas. La metadata usa `http://localhost:3000` como base de desarrollo hasta que se configure la URL real.
