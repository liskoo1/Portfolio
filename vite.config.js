import { defineConfig } from 'vite';

// The repo is also served statically (GitHub Pages from the repo root), where
// assets live under ./public/. Vite instead serves/copies `public/` at root.
// Rewriting './public/' -> './' at build time keeps both deployments working.
export default defineConfig({
  base: './',
  plugins: [
    {
      name: 'strip-public-prefix',
      transformIndexHtml(html) {
        return html.replace(/(src|href)="\.\/public\//g, '$1="./');
      },
    },
  ],
});
