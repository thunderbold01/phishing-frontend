import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        apos_login: resolve(__dirname, 'apos_login.html'),
        logs: resolve(__dirname, 'logs.html')
      }
    },
    minify: 'esbuild',
    cssMinify: true,
    target: 'es2015'
  },
  server: {
    port: 5173
  }
});
