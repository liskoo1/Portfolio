# Portfolio — Luis Requena Mellado

Portfolio personal con estética "Cinematic Dark" (fondo `#0A0A0A`, acentos dorados `#C9A96E`), tipografía Playfair Display / Raleway / Montserrat y arquitectura SASS 7-1 real.

## Características

- Una sola página: hero cinematográfico, sobre mí, experiencia y formación (timeline), skills, 13 proyectos con vídeos demo, contacto y footer.
- Filtros de proyectos por stack y botón "ver más" con animación de entrada.
- Modal de vídeo accesible (focus trap, Escape, restauración de foco) con embeds de YouTube en modo privacy-enhanced.
- Accesibilidad: skip-link, `:focus-visible`, `aria-pressed` en filtros, `prefers-reduced-motion` respetado en CSS y JS.
- SEO y social: Open Graph + Twitter Card, canonical, JSON-LD (`Person`), `robots.txt`, `sitemap.xml`, `llms.txt` y `og-image` generada.
- Rendimiento: imágenes en WebP con dimensiones intrínsecas (sin CLS), lazy loading, `fetchpriority` en el hero y fuentes con `preconnect` + `display=swap`.
- Lighthouse (móvil): 100 en Accesibilidad, Mejores prácticas y SEO.
- Copiar email al portapapeles, botón volver arriba y barra de progreso de scroll.

## Stack

- HTML5 + Vanilla JS (módulos), SASS compilado a CSS nativo.
- [Vite](https://vitejs.dev/) para dev server y build de producción.
- [sharp](https://sharp.pixelplumbing.com/) para la optimización de imágenes.
- Prettier + ESLint para formato y lint.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Compila el CSS y arranca el dev server de Vite |
| `npm run build` | Compila el CSS y genera `dist/` de producción |
| `npm run preview` | Sirve el `dist/` generado |
| `npm run build:css` | Compila `sass/app.scss` a `sass/style.css` |
| `npm run watch:css` | Recompila el CSS al guardar |
| `npm run optimize:images` | Convierte PNG a WebP, genera la og-image y parchea `index.html` |
| `npm run lint` | ESLint |
| `npm run format` / `format:check` | Prettier |

## Estructura

```
index.html            Página única
main.js               Interacciones (reveal, filtros, modal, scroll)
sass/                 Arquitectura 7-1
  app.scss            Entry — orden de cascada controlado aquí
  abstracts/          Tokens (variables CSS)
  base/               Reset, base, fuentes, animaciones, responsive
  components/         Botones y controles (skip-link, to-top, ...)
  layout/             Secciones (nav, hero, about, experience, ...)
public/               Estáticos (img/, cv/, fonts/, robots.txt, sitemap.xml, llms.txt)
scripts/              Herramientas (optimize-images.mjs)
.github/workflows/    Deploy a GitHub Pages
```

## Despliegue

El workflow `.github/workflows/deploy.yml` compila y despliega `dist/` a GitHub
Pages en cada push a `master`. Requisito único: en el repo, **Settings → Pages →
Source: GitHub Actions**.

La raíz del repo también puede servirse estáticamente (las rutas usan
`./public/...` y `vite.config.js` las reescribe en el build), por lo que el
cambio de método de despliegue no rompe nada entretanto.

## Contacto

- Email: luisrequenadev@outlook.com
- LinkedIn: [luis-requena-mellado](https://www.linkedin.com/in/luis-requena-mellado-b59123265/)
- GitHub: [liskoo1](https://github.com/liskoo1)
