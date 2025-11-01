import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/109-Show_Booking/', // GitHub Pages base path - matches your repo name
  server: {
    port: 3000,
    open: true
  }
});
