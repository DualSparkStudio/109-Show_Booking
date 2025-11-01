import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/showbooker/', // Change this to your repo name, or '/' for custom domain
  server: {
    port: 3000,
    open: true
  }
});
