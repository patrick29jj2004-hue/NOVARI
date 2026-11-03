# NOVARY Digital Studio

Sitio bilingüe (español e inglés) para un estudio digital. Incluye páginas de servicios, precios por cotización, cuatro demos conceptuales, formulario de contacto configurable y un catálogo imprimible A4.

> NOVARY es un nombre comercial de trabajo. Este proyecto no confirma registro legal ni disponibilidad de dominios. MAREA, ATELIER, AUREN y VERTEX son conceptos de demostración, no clientes ni negocios reales.

## Requisitos

- Node.js 24 (utilizado también en CI).
- npm.

## Instalación y desarrollo

```bash
npm ci
npm run dev
```

Abre `http://localhost:3000`. Las rutas principales son `/`, `/services`, `/work`, `/pricing`, `/about`, `/contact`, `/catalog`, `/privacy` y `/terms`. La versión inglesa usa el prefijo `/en`, por ejemplo `/en/work/fashion`.

## Variables de entorno

Copia `.env.example` a `.env.local` y configura solo los valores disponibles:

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canónica del sitio en producción. |
| `CONTACT_EMAIL` | Destinatario de consultas; también se muestra como canal de contacto. |
| `RESEND_API_KEY` | Credencial privada del proveedor de correo. Solo se usa en el servidor. |
| `RESEND_FROM_EMAIL` | Remitente verificado en Resend. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número internacional con código de país, solo dígitos recomendados. |
| `NEXT_PUBLIC_INSTAGRAM_URL` | URL real del perfil, si existe. |
| `NEXT_PUBLIC_TIKTOK_URL` | URL real del perfil, si existe. |
| `NEXT_PUBLIC_LINKEDIN_URL` | URL real del perfil, si existe. |

Sin las tres variables de Resend, el formulario muestra que el envío no está configurado; no informa un éxito ficticio. Si WhatsApp tampoco está configurado, los CTA llevan al formulario o al correo disponible. No se conectan pagos ni se guardan formularios en una base de datos.

El límite de intentos del endpoint de contacto vive en memoria por instancia y es una protección básica, no un limitador distribuido. Para producción con múltiples instancias, añade un rate limiter compartido y revisa las políticas de privacidad aplicables.

## Calidad y pruebas

```bash
npm run lint
npm run typecheck
npm run test
npx playwright install chromium
npm run test:e2e
npm run build
```

Vitest cubre validación de contacto, filtros y cálculos del carrito. Playwright cubre navegación, las cuatro demos, cambio de idioma, vista móvil, precios por cotización y el catálogo. Las pruebas E2E inician Next.js en el puerto `3100`.

## Catálogo PDF

El catálogo tiene diez páginas por idioma y estilos de impresión A4. Para generar archivos PDF reales y comprobar su número de páginas:

```bash
npx playwright install chromium
npm run catalog:pdf
```

El comando inicia temporalmente el servidor de desarrollo en `127.0.0.1:3178`, renderiza `/catalog` y `/en/catalog`, guarda `public/catalog/novary-catalog-es.pdf` y `public/catalog/novary-catalog-en.pdf`, valida diez páginas en cada uno y cierra el servidor. Si el puerto está ocupado, usa `NOVARY_PREVIEW_PORT` para elegir otro. La página ofrece la descarga solo cuando el PDF generado existe; mientras tanto, permite imprimir o guardar como PDF desde el navegador.

## Build y despliegue

```bash
npm run build
npm run start
```

En Vercel, importa el repositorio y define las variables de entorno necesarias para el entorno de producción. Configura `NEXT_PUBLIC_SITE_URL` con la URL real de despliegue. No hay despliegues automáticos en el workflow de CI. CI genera y valida los PDFs, ejecuta lint, tipos, pruebas y build, y publica los PDFs como artefacto de la ejecución.

## Estructura

- `src/app`: App Router, rutas, API, metadata, sitemap y robots.
- `src/components`: layout, páginas, formularios y demos.
- `src/lib`: contenido, configuración, validación y lógica de catálogo/carrito.
- `scripts`: generación automatizada del catálogo.
- `e2e`: escenarios de navegador.
- `.github/workflows`: validación de Pull Requests y pushes a `main`.
- `docs/architecture.md`: decisiones y límites de la arquitectura.
